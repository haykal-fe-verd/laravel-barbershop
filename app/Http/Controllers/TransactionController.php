<?php

namespace App\Http\Controllers;

use App\Models\Barberman;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Midtrans\Config;
use Midtrans\Snap;

class TransactionController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function generateNoAntrian()
    {
        $today = now()->startOfDay();

        $lastTransactionToday = Transaction::whereDate('created_at', $today)
            ->orderBy('created_at', 'desc')
            ->first();

        $nextNumber = 1;

        if ($lastTransactionToday && $lastTransactionToday->no_antrian) {
            $nextNumber = intval($lastTransactionToday->no_antrian) + 1;
        }

        return str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }

    public function index(Request $request): Response
    {
        $query = Transaction::query()->with(['barberman', 'product', 'user'])->latest();

        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        $query->orderBy('updated_at', 'desc');

        $transactions = $query->paginate($request->perpage ?? 8)->withQueryString();

        return Inertia::render('admin/transaksi/index', compact('transactions'));
    }

    public function status(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'status' => 'required',
            'status_pangkas' => 'required',
        ]);

        $transaction = Transaction::find($id);

        $transaction->update([
            'status' => $request->status,
            'status_pangkas' => $request->status_pangkas,
        ]);

        return redirect()->route('transaction.index')->with('success', 'Status Transaksi Berhasil Diperbarui');
    }


    public function booking_index(): Response
    {
        $products = Product::all();
        $barbermans = Barberman::all();
        $antrian = $this->generateNoAntrian();

        return Inertia::render('user/booking/index', compact('products', 'barbermans', 'antrian'));
    }

    public function booking_store(Request $request): RedirectResponse
    {
        $request->validate([
            'barberman' => 'required',
            'via' => 'required',
            'id_barberman' => 'required',
            'id_product' => 'required',
            'total' => 'required',
        ]);

        $snapToken = null;
        $userName = strtoupper($request->user()->name);
        $userName = str_replace(' ', '', $userName);
        $invoice = 'INV-' . $userName . '-' . rand();

        $transaction = new Transaction();
        $transaction->id_user = $request->user()->id;
        $transaction->id_product = $request->id_product;
        $transaction->id_barberman = $request->id_barberman;
        $transaction->invoice = $invoice;
        $transaction->total = $request->total;
        $transaction->no_antrian = $this->generateNoAntrian();

        if ($request->via == 'transfer') {
            $params = [
                'transaction_details' => [
                    'order_id' => $invoice,
                    'gross_amount' => (int)$request->total,
                ],
                'customer_details' => [
                    'first_name' => $request->user()->name,
                    'last_name' => "",
                    'email' => $request->user()->email,
                    'phone' => $request->user()->phone,
                ]
            ];

            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $transaction->snap_token = $snapToken;
        }

        if ($request->via == 'tunai') {
            $transaction->via = 'tunai';
        }

        $transaction->save();

        return redirect()->route('booking.index')->with('success', 'Transaksi Berhasil Dibuat')->with('snapToken', $snapToken);
    }

    public function success(Request $request): Response
    {
        if ($request->order_id) {
            $this->onSuccess($request);
        }

        if ($request->status_code == 201) {
            $this->onPending($request);
        }

        return Inertia::render('user/booking/success');
    }

    public function onSuccess(Request $request)
    {
        $transaction = Transaction::where('invoice', $request->order_id)->first();

        $transaction->update([
            'via' => $request->payment_type,
            'status' => $request->transaction_status
        ]);
    }

    public function onPending(Request $request)
    {
        $transaction = Transaction::where('invoice', $request->order_id)->first();
        $transaction->update([
            'via' => $request->payment_type,
            'status' => $request->transaction_status
        ]);
    }
}
