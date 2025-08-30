<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Rental;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        
        // --- Statistik Personal Pengguna (Sudah Benar) ---
        $myItemsCount = Item::where('user_id', $user->id)->count();
        $myActiveRentalsCount = Rental::where(function ($query) use ($user) {
                $query->where('renter_id', $user->id)
                      ->orWhere('owner_id', $user->id);
            })
            ->whereIn('status', ['confirmed', 'ongoing'])
            ->count();
        $myTransactionsCount = Transaction::where('buyer_id', $user->id)
            ->orWhere('seller_id', $user->id)
            ->count();
        
        // --- PERBAIKAN UTAMA DI SINI ---
        // Mengambil item yang baru saja DITAMBAHKAN OLEH PENGGUNA INI, bukan dari seluruh platform.
        $myRecentItems = Item::with('category')
            ->where('user_id', $user->id) // <-- KLAUSA PENTING YANG DITAMBAHKAN
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
            
        // --- Riwayat Aktivitas Personal (Sudah Benar) ---
        $recentRentals = Rental::with(['item', 'renter', 'owner'])
            ->where(function ($query) use ($user) {
                $query->where('renter_id', $user->id)
                      ->orWhere('owner_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
            
        $recentTransactions = Transaction::with(['item', 'buyer', 'seller'])
            ->where(function ($query) use ($user) {
                $query->where('buyer_id', $user->id)
                      ->orWhere('seller_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Mengirim data yang sudah benar dan relevan ke frontend
        return Inertia::render('Dashboard', [
            'stats' => [
                'myItems' => $myItemsCount,
                'myActiveRentals' => $myActiveRentalsCount,
                'myTransactions' => $myTransactionsCount,
            ],
            // Mengirim item milik pengguna, bukan item acak
            'recentItems' => $myRecentItems, 
            'recentRentals' => $recentRentals,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}