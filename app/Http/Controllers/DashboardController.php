<?php

namespace App\Http\Controllers;

use App\Models\Barberman;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $role = $request->user()->role;

        $startOfDay = Carbon::today()->startOfDay();
        $endOfDay = Carbon::today()->endOfDay();
        $antrian_berjalan_sekarang = Transaction::whereBetween('updated_at', [$startOfDay, $endOfDay])
            ->where('is_active_antrian', true)->first();

        if ($role == 'admin') {
            $total_transaksi_hari_ini = Transaction::whereDate('created_at', Carbon::today())->count();
            $total_admin = User::where('role', 'admin')->count();
            $total_barberman = Barberman::count();
            $total_paket = Product::count();

            return Inertia::render('dashboard/admin', compact('antrian_berjalan_sekarang', 'total_transaksi_hari_ini', 'total_admin', 'total_barberman', 'total_paket'));
        } else {
            $total_transaksi_saya = Transaction::where('id_user', $request->user()->id)->count();
            $paket = Product::take(3)->get();

            return Inertia::render('dashboard/user', compact('antrian_berjalan_sekarang', 'total_transaksi_saya', 'paket'));
        }
    }
}
