<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'rental_price_per_day',
        'deposit_amount',
        'condition',
        'availability_type',
        'status',
        'location',
        'images',
        'brand',
        'model',
        'year_purchased',
        'stock_quantity',
        'notes',
        'is_featured',
        'is_active',
        'is_available',
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'rental_price_per_day' => 'decimal:2',
        'deposit_amount' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'is_available' => 'boolean',
        'year_purchased' => 'integer',
        'stock_quantity' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function activeRentals(): HasMany
    {
        return $this->hasMany(Rental::class)->whereIn('status', ['confirmed', 'ongoing']);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function isAvailableForRent(): bool
    {
        return in_array($this->availability_type, ['rent', 'both']) && 
               $this->status === 'available' && 
               $this->is_active;
    }

    public function isAvailableForSale(): bool
    {
        return in_array($this->availability_type, ['sale', 'both']) && 
               $this->status === 'available' && 
               $this->is_active;
    }

    public function getMainImageUrlAttribute(): ?string
    {
        // Prioritaskan kolom 'image' (tunggal) jika ada
        if ($this->image) {
            // Cek apakah ini URL eksternal (dari seeder) atau path internal
            if (filter_var($this->image, FILTER_VALIDATE_URL)) {
                return $this->image;
            }
            return asset('storage/' . $this->image);
        }

        // Fallback ke array 'images' jika 'image' tunggal kosong
        if (!empty($this->images) && isset($this->images[0])) {
            return asset('storage/' . $this->images[0]);
        }
        
        return null;
    }
}
