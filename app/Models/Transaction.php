<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    // app/Models/Transaction.php
protected $fillable = [
    'transaction_number', // Tambah
    'item_id',
    'buyer_id',
    'seller_id',
    'amount', // Ubah dari 'price'
    'status',
    'payment_method',
    'delivery_method', // Tambah
    'delivery_address', // Tambah
    'payment_proof',
    'notes',
    'completed_at',
];
    protected $casts = [
        'price' => 'decimal:2',
        'completed_at' => 'datetime',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }
}
