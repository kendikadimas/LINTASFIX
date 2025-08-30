<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Rental extends Model
{
    use HasFactory;

    // app/Models/Rental.php
// app/Models/Rental.php

protected $fillable = [
    'rental_number',
    'item_id',
    'renter_id',
    'owner_id',
    'start_date',
    'end_date',
    'daily_rate',
    'total_days',
    'deposit_amount', // Pastikan nama ini cocok (bukan security_deposit)
    'total_amount',   // Pastikan nama ini cocok (bukan total_price)
    'payment_method',
    'delivery_method',
    'delivery_address',
    'status',
    'notes', // Menggantikan rental_notes
    'return_notes',
    'actual_return_date',
    'condition_before',
    'condition_after',
    'late_fee',
    'damage_fee',
];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'actual_return_date' => 'datetime',
        'total_price' => 'decimal:2',
        'security_deposit' => 'decimal:2',
        'late_fee' => 'decimal:2',
        'damage_fee' => 'decimal:2',
        'condition_before' => 'array',
        'condition_after' => 'array',
    ];

    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function renter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'renter_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function getDurationAttribute(): int
    {
        return $this->start_date->diffInDays($this->end_date) + 1;
    }

    public function isOverdue(): bool
    {
        return $this->status === 'ongoing' && Carbon::now()->isAfter($this->end_date);
    }

    public function getDaysOverdueAttribute(): int
    {
        if (!$this->isOverdue()) {
            return 0;
        }
        return Carbon::now()->diffInDays($this->end_date);
    }
}
