<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class RentalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $rentals = Rental::with(['item.category', 'renter', 'owner'])
            ->where(function ($query) {
                $query->where('renter_id', Auth::id())
                      ->orWhere('owner_id', Auth::id());
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Rentals/Index', [
            'rentals' => $rentals,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $item = Item::with(['user', 'category'])->findOrFail($request->item_id);
        
        if (!$item->isAvailableForRent()) {
            abort(400, 'Item tidak tersedia untuk disewa');
        }

        return Inertia::render('Rentals/Create', [
            'item' => $item,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'rental_notes' => 'nullable|string',
        ]);

        $item = Item::findOrFail($validated['item_id']);
        
        if (!$item->isAvailableForRent()) {
            return back()->withErrors(['item_id' => 'Item tidak tersedia untuk disewa']);
        }

        if ($item->user_id === Auth::id()) {
            return back()->withErrors(['item_id' => 'Anda tidak bisa menyewa item sendiri']);
        }

        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $duration = $startDate->diffInDays($endDate) + 1;
        $totalPrice = $duration * $item->rental_price_per_day;

        $rental = Rental::create([
            'item_id' => $item->id,
            'renter_id' => Auth::id(),
            'owner_id' => $item->user_id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'total_price' => $totalPrice,
            'security_deposit' => $totalPrice * 0.5, // 50% dari total harga sebagai deposit
            'status' => 'pending',
            'rental_notes' => $validated['rental_notes'],
        ]);

        return redirect()->route('rentals.show', $rental)->with('success', 'Permintaan sewa berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Rental $rental): Response
    {
        $rental->load(['item.category', 'renter', 'owner']);
        
        if ($rental->renter_id !== Auth::id() && $rental->owner_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Rentals/Show', [
            'rental' => $rental,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rental $rental)
    {
        if ($rental->owner_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:confirmed,cancelled',
            'return_notes' => 'nullable|string',
        ]);

        if ($validated['status'] === 'confirmed') {
            // Update item status menjadi rented
            $rental->item->update(['status' => 'rented']);
        }

        $rental->update($validated);

        return redirect()->route('rentals.show', $rental)->with('success', 'Status rental berhasil diperbarui!');
    }

    /**
     * Complete rental return
     */
    public function completeReturn(Request $request, Rental $rental)
    {
        if ($rental->owner_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'condition_after' => 'required|array',
            'damage_fee' => 'nullable|numeric|min:0',
            'return_notes' => 'nullable|string',
        ]);

        $rental->update([
            'status' => 'returned',
            'actual_return_date' => Carbon::now(),
            'condition_after' => $validated['condition_after'],
            'damage_fee' => $validated['damage_fee'] ?? 0,
            'return_notes' => $validated['return_notes'],
        ]);

        // Update item status kembali ke available
        $rental->item->update(['status' => 'available']);

        return redirect()->route('rentals.show', $rental)->with('success', 'Rental telah dikembalikan!');
    }

    /**
     * Cancel rental
     */
    public function cancel(Rental $rental)
    {
        if ($rental->renter_id !== Auth::id() && $rental->owner_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($rental->status, ['pending', 'confirmed'])) {
            return back()->withErrors(['status' => 'Rental tidak dapat dibatalkan']);
        }

        $rental->update(['status' => 'cancelled']);

        // Jika item sudah di-confirm, kembalikan status ke available
        if ($rental->item->status === 'rented') {
            $rental->item->update(['status' => 'available']);
        }

        return redirect()->route('rentals.show', $rental)->with('success', 'Rental berhasil dibatalkan!');
    }
}
