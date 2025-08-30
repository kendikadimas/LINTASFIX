<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $transactions = Transaction::with(['item.category', 'buyer', 'seller'])
            ->where(function ($query) {
                $query->where('buyer_id', Auth::id())
                      ->orWhere('seller_id', Auth::id());
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $item = Item::with(['user', 'category'])->findOrFail($request->item_id);
        
        if (!$item->isAvailableForSale()) {
            abort(400, 'Item tidak tersedia untuk dijual');
        }

        return Inertia::render('Transactions/Create', [
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
            'payment_method' => 'required|in:cash,transfer,e_wallet',
            'notes' => 'nullable|string',
        ]);

        $item = Item::findOrFail($validated['item_id']);
        
        if (!$item->isAvailableForSale()) {
            return back()->withErrors(['item_id' => 'Item tidak tersedia untuk dijual']);
        }

        if ($item->user_id === Auth::id()) {
            return back()->withErrors(['item_id' => 'Anda tidak bisa membeli item sendiri']);
        }

        $transaction = Transaction::create([
            'item_id' => $item->id,
            'buyer_id' => Auth::id(),
            'seller_id' => $item->user_id,
            'price' => $item->price,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'notes' => $validated['notes'],
        ]);

        // Update item status menjadi sold jika availability_type adalah 'sale'
        if ($item->availability_type === 'sale') {
            $item->update(['status' => 'sold']);
        }

        return redirect()->route('transactions.show', $transaction)->with('success', 'Transaksi berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction): Response
    {
        $transaction->load(['item.category', 'buyer', 'seller']);
        
        if ($transaction->buyer_id !== Auth::id() && $transaction->seller_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'status' => 'required|in:paid,completed,cancelled,refunded',
            'payment_proof' => 'nullable|string',
        ]);

        // Only seller can mark as paid/completed, buyer can upload payment proof
        if (in_array($validated['status'], ['paid', 'completed']) && $transaction->seller_id !== Auth::id()) {
            abort(403);
        }

        if ($validated['status'] === 'completed') {
            $validated['completed_at'] = Carbon::now();
            
            // Jika item availability_type adalah 'both', ubah ke 'rent' karena sudah terjual
            if ($transaction->item->availability_type === 'both') {
                $transaction->item->update(['availability_type' => 'rent']);
            }
        }

        if ($validated['status'] === 'cancelled') {
            // Kembalikan status item ke available jika dibatalkan
            $transaction->item->update(['status' => 'available']);
        }

        $transaction->update($validated);

        return redirect()->route('transactions.show', $transaction)->with('success', 'Status transaksi berhasil diperbarui!');
    }

    /**
     * Upload payment proof
     */
    public function uploadPaymentProof(Request $request, Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('payment_proof')) {
            $file = $request->file('payment_proof');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('payment_proofs', $filename, 'public');
            
            $transaction->update([
                'payment_proof' => $filename,
                'status' => 'paid'
            ]);
        }

        return redirect()->route('transactions.show', $transaction)->with('success', 'Bukti pembayaran berhasil diupload!');
    }

    /**
     * Cancel transaction
     */
    public function cancel(Transaction $transaction)
    {
        if ($transaction->buyer_id !== Auth::id() && $transaction->seller_id !== Auth::id()) {
            abort(403);
        }

        if (!in_array($transaction->status, ['pending', 'paid'])) {
            return back()->withErrors(['status' => 'Transaksi tidak dapat dibatalkan']);
        }

        $transaction->update(['status' => 'cancelled']);

        // Kembalikan status item ke available
        $transaction->item->update(['status' => 'available']);

        return redirect()->route('transactions.show', $transaction)->with('success', 'Transaksi berhasil dibatalkan!');
    }
}
