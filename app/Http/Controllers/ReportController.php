<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $reports = [];

        if ($request->from && $request->to) {
            $from = $request->from;
            $to = $request->to;

            $reports =
                Transaction::query()
                ->with(['barberman', 'product', 'user'])
                ->whereBetween('created_at', [$from, $to])
                ->get();
        }

        return Inertia::render('admin/laporan/index', compact('reports'));
    }

    public function antrian(): Response
    {
        $startOfDay = Carbon::today()->startOfDay();
        $endOfDay = Carbon::today()->endOfDay();

        $queu = Transaction::with(['barberman', 'product', 'user'])
            ->whereBetween('updated_at', [$startOfDay, $endOfDay])
            ->orderBy('no_antrian', 'asc')
            ->get();

        return Inertia::render('admin/antrian/index', compact('queu'));
    }

    public function set_active($id): RedirectResponse
    {
        $transaction = Transaction::find($id);
        $transaction->update([
            'is_active_antrian' => true
        ]);

        return redirect()->back();
    }

    public function set_inactive($id): RedirectResponse
    {
        $transaction = Transaction::find($id);
        $transaction->update([
            'is_active_antrian' => false
        ]);

        return redirect()->back();
    }

    public function transaction_user(Request $reqeust): Response
    {
        $query = Transaction::query()
            ->with(['barberman', 'product', 'user'])
            ->where('id_user', $reqeust->user()->id)
            ->latest();

        if ($reqeust->search) {
            $search = $reqeust->search;

            $query->where(function ($q) use ($search) {
                $q->where('invoice', 'like', '%' . $search . '%')
                    ->orWhere('no_antrian', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%')
                    ->orWhere('status_pangkas', 'like', '%' . $search . '%');
            });
        }

        $transactions = $query->paginate($reqeust->perpage ?? 8)->withQueryString();

        return Inertia::render('user/riwayat-transaksi/index', compact('transactions'));
    }
}
