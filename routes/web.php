<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rute Publik (Non-parameter)
|--------------------------------------------------------------------------
*/
Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/browse', [ItemController::class, 'browse'])->name('browse');

/*
|--------------------------------------------------------------------------
| Rute Terautentikasi
|--------------------------------------------------------------------------
| Semua rute yang butuh login kita definisikan di sini.
| Termasuk /items/create yang spesifik.
*/
Route::middleware(['auth'])->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Pengaturan Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Manajemen Barang Pengguna (My Items)
    Route::resource('items', ItemController::class)->except(['index', 'show']); 
    // Route::get('/items/create', [ItemController::class, 'create'])->name('items.create');
    // Route::post('/items', [ItemController::class, 'store'])->name('items.store');
    Route::get('/my-items', [ItemController::class, 'myItems'])->name('items.my');
    
    // Alur Checkout, Transaksi, dan Sewa
    Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout.create');
    Route::post('/checkout/process', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/success/{transaction}', [CheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/rental-success/{rental}', [CheckoutController::class, 'rentalSuccess'])->name('checkout.rental-success');

    Route::resource('transactions', TransactionController::class)->only(['index', 'show', 'update']);
    Route::resource('rentals', RentalController::class)->only(['index', 'show', 'update']);
    Route::post('/transactions/{transaction}/upload-proof', [TransactionController::class, 'uploadPaymentProof'])
         ->name('transactions.upload-payment-proof');
    Route::post('/items/bulk-delete', [ItemController::class, 'bulkDelete'])->name('items.bulk-delete');
    Route::post('/transactions/{transaction}/cancel', [TransactionController::class, 'cancel'])->name('transactions.cancel');
    Route::post('/rentals/{rental}/cancel', [RentalController::class, 'cancel'])->name('rentals.cancel');
    Route::post('/rentals/{rental}/complete-return', [RentalController::class, 'completeReturn'])->name('rentals.complete-return');
});

/*
|--------------------------------------------------------------------------
| Rute Publik (Parameter) - DIDEFINISIKAN PALING AKHIR
|--------------------------------------------------------------------------
| Rute umum dengan parameter seperti {slug} harus diletakkan paling bawah
| untuk menghindari konflik dengan rute spesifik seperti /items/create.
*/
Route::get('/items/{item:slug}', [ItemController::class, 'show'])->name('items.show.public');

/*
|--------------------------------------------------------------------------
| Rute Autentikasi
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';