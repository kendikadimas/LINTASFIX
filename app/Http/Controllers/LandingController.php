<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
        public function index()
    {
        // --- PERBAIKAN 1: Mengambil item yang ditandai sebagai 'is_featured' ---
        $featuredItems = Item::with(['user', 'category'])
            ->where('is_available', true)
            ->where('is_featured', true) // Menggunakan kolom is_featured
            ->latest()
            ->take(8) // Mengambil 8 item unggulan
            ->get();

        // Mengambil kategori populer (logika ini sudah bagus)
        $categories = Category::whereHas('items')
            ->withCount('items')
            ->orderBy('items_count', 'desc')
            ->take(12) // Mengambil 12 kategori
            ->get();

        // --- PERBAIKAN 2: Hapus array ikon hardcoded ---
        // Array $categoryIcons tidak lagi diperlukan karena ikon diambil dari database.
        // Setiap objek $category sudah memiliki properti 'icon'.

        // Statistik platform (logika ini sudah bagus)
        $stats = [
            'totalItems' => Item::where('is_available', true)->count(),
            'totalUsers' => User::count(), // Anda bisa sederhanakan jika tidak perlu filter is_verified
            'totalCategories' => Category::whereHas('items')->count(),
            'totalTransactions' => 0, // Placeholder, karena tabel transactions belum di-query
        ];

        return Inertia::render('LandingPage', [
            'featuredItems' => $featuredItems,
            'categories' => $categories,
            'stats' => $stats,
        ]);
    }
}
