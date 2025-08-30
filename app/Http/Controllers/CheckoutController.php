<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Transaction;
use App\Models\Rental;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CheckoutController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'type' => 'required|in:purchase,rental',
            'days' => 'nullable|integer|min:1|max:30',
            'price' => 'nullable|numeric|min:0',
            'total_price' => 'nullable|numeric|min:0',
        ]);

        $item = Item::with(['user', 'category'])->findOrFail($validated['item_id']);

        // Check if user is trying to buy their own item
        if ($item->user_id === Auth::id()) {
            return redirect()->back()->with('error', 'You cannot purchase your own item.');
        }

        // Check availability
        if (!$item->is_available) {
            return redirect()->back()->with('error', 'This item is no longer available.');
        }

        // Validate type availability
        if ($validated['type'] === 'purchase') {
            if (!in_array($item->availability_type, ['sale', 'both'])) {
                return redirect()->back()->with('error', 'This item is not available for purchase.');
            }
            $totalPrice = $item->price;
        } else {
            if (!in_array($item->availability_type, ['rent', 'both'])) {
                return redirect()->back()->with('error', 'This item is not available for rent.');
            }
            if (!$item->rental_price_per_day) {
                return redirect()->back()->with('error', 'Rental price not set for this item.');
            }
            $days = $validated['days'] ?? 1;
            $rentalCost = $item->rental_price_per_day * $days;
            $deposit = $item->deposit_amount ?? 0;
            $totalPrice = $rentalCost + $deposit;
        }
        

        return Inertia::render('Checkout/Create', [
            'item' => $item,
            'checkoutData' => [
                'type' => $validated['type'],
                'days' => $validated['days'] ?? null,
                'rental_cost' => isset($rentalCost) ? $rentalCost : null,
                'deposit' => isset($deposit) ? $deposit : null,
                'total_price' => $totalPrice,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'type' => 'required|in:purchase,rental',
            'days' => 'required_if:type,rental|nullable|integer|min:1|max:30',
            'payment_method' => 'required|in:bank_transfer,e_wallet,cash',
            'delivery_method' => 'required|in:pickup,delivery',
            'delivery_address' => 'required_if:delivery_method,delivery|nullable|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        $item = Item::with('user')->findOrFail($validated['item_id']);
        $user = Auth::user();

        // Check if user is trying to buy their own item
        if ($item->user_id === $user->id) {
            return redirect()->back()->with('error', 'You cannot purchase your own item.');
        }

        // Check availability
        if (!$item->is_available) {
            return redirect()->back()->with('error', 'This item is no longer available.');
        }

        try {
            if ($validated['type'] === 'purchase') {
                // Create transaction for purchase
                $transaction = Transaction::create([
                    'transaction_number' => 'TXN-' . strtoupper(Str::random(8)),
                    'buyer_id' => $user->id,
                    'seller_id' => $item->user_id,
                    'item_id' => $item->id,
                    'amount' => $item->price,
                    'payment_method' => $validated['payment_method'],
                    'delivery_method' => $validated['delivery_method'],
                    'delivery_address' => $validated['delivery_address'] ?? null,
                    'notes' => $validated['notes'] ?? null,
                    'status' => 'pending_payment',
                ]);

                // Mark item as unavailable if it's a sale-only item
                if ($item->availability_type === 'sale') {
                    $item->update(['is_available' => false]);
                }

                return redirect()->route('checkout.success', ['transaction' => $transaction->id])
                    ->with('success', 'Order placed successfully! Please proceed with payment.');

            } else {
                // Create rental
                $days = $validated['days'];
                $startDate = Carbon::now();
                $endDate = Carbon::now()->addDays($days);
                // $rentalCost = $item->rental_price_per_day * $days;
                // $deposit = $item->deposit_amount ?? 0;
                $totalAmount = ($item->rental_price_per_day * $days) + ($item->deposit_amount ?? 0);

                $rental = Rental::create([
                    'rental_number' => 'RNT-' . strtoupper(Str::random(8)),
                    'renter_id' => $user->id,
                    'owner_id' => $item->user_id,
                    'item_id' => $item->id,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'daily_rate' => $item->rental_price_per_day,
                    'total_days' => $days,
                    'deposit_amount' => $item->deposit_amount ?? 0,
                    'total_amount' => $totalAmount,
                    'payment_method' => $validated['payment_method'],
                    'delivery_method' => $validated['delivery_method'],
                    'delivery_address' => $validated['delivery_address'] ?? null,
                    'notes' => $validated['notes'] ?? null,
                    'status' => 'pending_payment',
                ]);

                // Mark item as unavailable for the rental period
                if ($item->availability_type === 'rent') {
                    $item->update(['is_available' => false]);
                }

                return redirect()->route('checkout.rental-success', $rental)
                    ->with('success', 'Rental booking created successfully! Please proceed with payment.');
            }

        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Something went wrong. Please try again.')
                ->withInput();
        }
    }

    public function success(Transaction $transaction)
    {
        // Ensure user can only view their own transactions
        if ($transaction->buyer_id !== Auth::id()) {
            abort(403);
        }

        $transaction->load(['item', 'seller']);

        return Inertia::render('Checkout/Success', [
            'transaction' => $transaction,
            'type' => 'purchase',
        ]);
    }

    public function rentalSuccess(Rental $rental)
    {
        // Ensure user can only view their own rentals
        if ($rental->renter_id !== Auth::id()) {
            abort(403);
        }

        $rental->load(['item', 'owner']);

        return Inertia::render('Checkout/Success', [
            'rental' => $rental,
            'type' => 'rental',
        ]);
    }
}
