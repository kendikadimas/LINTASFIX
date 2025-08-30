<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ItemController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource for public browsing
     */
    public function browse(Request $request): Response
    {
        $items = Item::with(['user', 'category'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->when($request->category, function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($request->availability_type, function ($query, $type) {
                if ($type === 'sale') {
                    $query->whereIn('availability_type', ['sale', 'both']);
                } elseif ($type === 'rent') {
                    $query->whereIn('availability_type', ['rent', 'both']);
                }
            })
            ->when($request->condition, function ($query, $condition) {
                $query->where('condition', $condition);
            })
            ->when($request->price_min, function ($query, $priceMin) {
                $query->where('price', '>=', $priceMin);
            })
            ->when($request->price_max, function ($query, $priceMax) {
                $query->where('price', '<=', $priceMax);
            })
            ->when($request->sort, function ($query, $sort) {
                switch ($sort) {
                    case 'price_low':
                        $query->orderBy('price', 'asc');
                        break;
                    case 'price_high':
                        $query->orderBy('price', 'desc');
                        break;
                    case 'newest':
                        $query->orderBy('created_at', 'desc');
                        break;
                    case 'oldest':
                        $query->orderBy('created_at', 'asc');
                        break;
                    default:
                        $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc');
                }
            }, function ($query) {
                $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc');
            })
            ->where('is_available', true)
            ->paginate(12)
            ->withQueryString();

        $categories = Category::withCount('items')
            ->get()
            ->filter(function ($category) {
                return $category->items_count > 0;
            })
            ->sortBy('name')
            ->values();

        return Inertia::render('Browse/Index', [
            'items' => $items,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'availability_type', 'condition', 'price_min', 'price_max', 'sort']),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $items = Item::with(['user', 'category'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('description', 'like', '%' . $search . '%');
            })
            ->when($request->category, function ($query, $category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                });
            })
            ->when($request->availability_type, function ($query, $type) {
                if ($type === 'sale') {
                    $query->whereIn('availability_type', ['sale', 'both']);
                } elseif ($type === 'rent') {
                    $query->whereIn('availability_type', ['rent', 'both']);
                }
            })
            ->when($request->condition, function ($query, $condition) {
                $query->where('condition', $condition);
            })
            ->where('is_active', true)
            ->where('status', 'available')
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString();

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('Items/Index', [
            'items' => $items,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'availability_type', 'condition']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // dd('Langkah 3: Method create() di ItemController berhasil dieksekusi!'); // <-- TAMBAHKAN INI

        $categories = Category::where('is_active', true)->get();
        
        return Inertia::render('Items/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // app/Http/Controllers/ItemController.php

public function store(Request $request): RedirectResponse
{
    // 1. Validasi dasar
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'category_id' => 'required|exists:categories,id',
        'condition' => 'required|in:excellent,good,fair',
        'location' => 'nullable|string|max:255',
        'availability_type' => 'required|in:sale,rent,both',
        'images' => 'nullable|array',
        'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        // Validasi harga akan dilakukan secara kondisional di bawah
        'price' => 'nullable|numeric|min:0',
        'rental_price_per_day' => 'nullable|numeric|min:0',
    ]);

    $imagePaths = [];
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $file) {
            // Membuat nama file yang unik dan menyimpannya di storage/app/public/items
            $path = $file->store('items', 'public'); 
            // Hanya menyimpan path relatif, contoh: "items/nama-file.jpg"
            array_push($imagePaths, $path);
        }
    }

    // 2. Validasi kondisional untuk harga
    $request->validate([
        'price' => Rule::requiredIf(in_array($request->availability_type, ['sale', 'both'])),
        'rental_price_per_day' => Rule::requiredIf(in_array($request->availability_type, ['rent', 'both'])),
    ]);

    // 3. Menambahkan data yang dihasilkan server
    $validated['user_id'] = Auth::id();
    $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(6);
    $validated['status'] = 'available'; // <-- Penting agar muncul di toko
    $validated['is_available'] = true; // <-- Penting agar muncul di toko
    $validated['images'] = $imagePaths; // Simpan array path gambar

    // 4. Membuat item di database
    $item = Item::create($validated);

    // 5. Mengarahkan ke halaman item yang baru dibuat
    // Gunakan slug untuk URL yang lebih baik
    return redirect('/items/' . $item->slug)->with('success', 'Item berhasil ditambahkan!');
}

    /**
     * Display the specified resource.
     */
    public function show(Item $item): Response
    {
        $item->load(['user', 'category', 'rentals.renter', 'transactions.buyer']);
        
        $relatedItems = Item::where('category_id', $item->category_id)
            ->where('id', '!=', $item->id)
            ->where('is_active', true)
            ->where('status', 'available')
            ->with(['user', 'category'])
            ->limit(4)
            ->get();

        return Inertia::render('Items/Show', [
            'item' => $item,
            'relatedItems' => $relatedItems,
        ]);
    }

    /**
     * Display the specified resource by numeric id (fallback for legacy links).
     */
    public function showById($id): RedirectResponse|Response
    {
        // Load the item by numeric id; if found, redirect to the canonical slug URL.
        $item = Item::where('id', $id)
            ->where('is_active', true)
            ->where('status', 'available')
            ->firstOrFail();

        // Redirect to the slug-based public route to keep a single canonical URL (301)
        return redirect()->route('items.show.public', ['item' => $item->slug], 301);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item): Response
    {
        if ($item->user_id !== Auth::id()) {
            abort(403);
        }
        
        $categories = Category::where('is_active', true)->get();
        
        return Inertia::render('Items/Edit', [
            'item' => $item,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        if ($item->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'rental_price_per_day' => 'nullable|numeric|min:0',
            'condition' => 'required|in:excellent,good,fair,poor',
            'availability_type' => 'required|in:sale,rent,both',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'year_purchased' => 'nullable|integer|min:1900|max:' . date('Y'),
            'stock_quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        if ($validated['availability_type'] === 'rent' || $validated['availability_type'] === 'both') {
            $request->validate([
                'rental_price_per_day' => 'required|numeric|min:0',
            ]);
        }

        $item->update($validated);

        return redirect()->route('items.show', $item)->with('success', 'Item berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        if ($item->user_id !== Auth::id()) {
            abort(403);
        }

        $item->update(['is_active' => false]);

        return redirect()->route('items.index')->with('success', 'Item berhasil dihapus!');
    }

    /**
     * Display user's items
     */
    public function myItems(): Response
    {
        $items = Item::where('user_id', Auth::id())
            ->with(['category', 'rentals', 'transactions'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Items/Index', [
            'items' => $items,
        ]);
    }
}
