<?php

use App\Http\Controllers\BarbermanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

//! guest
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/success', [TransactionController::class, 'success'])->name('success');

//! auth
Route::middleware(['auth', 'verified'])->group(function () {
    // all
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    //admin
    Route::prefix('admin')->middleware('can:admin')->group(function () {
        Route::get('barberman', [BarbermanController::class, 'index'])->name('barberman.index');
        Route::post('barberman', [BarbermanController::class, 'store'])->name('barberman.store');
        Route::post('barberman/{id}', [BarbermanController::class, 'update'])->name('barberman.update');
        Route::delete('barberman/{id}', [BarbermanController::class, 'destroy'])->name('barberman.destroy');

        Route::get('gallery', [GalleryController::class, 'index'])->name('gallery.index');
        Route::post('gallery', [GalleryController::class, 'store'])->name('gallery.store');
        Route::post('gallery/{id}', [GalleryController::class, 'update'])->name('gallery.update');
        Route::delete('gallery/{id}', [GalleryController::class, 'destroy'])->name('gallery.destroy');

        Route::get('product', [ProductController::class, 'index'])->name('product.index');
        Route::post('product', [ProductController::class, 'store'])->name('product.store');
        Route::post('product/{id}', [ProductController::class, 'update'])->name('product.update');
        Route::delete('product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

        Route::get('user', [UserController::class, 'index'])->name('user.index');
        Route::post('user', [UserController::class, 'store'])->name('user.store');
        Route::post('user/{id}', [UserController::class, 'update'])->name('user.update');
        Route::delete('user/{id}', [UserController::class, 'destroy'])->name('user.destroy');

        Route::get('transaksi', [TransactionController::class, 'index'])->name('transaction.index');
        Route::post('transaksi/{id}/status', [TransactionController::class, 'status'])->name('transaction.status');

        Route::get('antrian', [ReportController::class, 'antrian'])->name('antrian.index');
        Route::post('antrian/{id}/set-active', [ReportController::class, 'set_active'])->name('antrian.set.active');
        Route::post('antrian/{id}/set-inactive', [ReportController::class, 'set_inactive'])->name('antrian.set.inactive');

        Route::get('report', [ReportController::class, 'index'])->name('report.index');
    });

    // user
    Route::middleware('can:user')->group(function () {
        Route::get('booking', [TransactionController::class, 'booking_index'])->name('booking.index');
        Route::post('booking', [TransactionController::class, 'booking_store'])->name('booking.store');

        Route::get('barberman', [BarbermanController::class, 'barberman_user'])->name('barberman.user');

        Route::get('transaksi-saya', [ReportController::class, 'transaction_user'])->name('transaction.user');
    });
});


require __DIR__ . '/auth.php';
