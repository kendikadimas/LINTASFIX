<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'student_id',
        'university',
        'faculty',
        'major',
        'semester',
        'phone',
        'address',
        'avatar',
        'rating',
        'rating_count',
        'is_verified',
        'verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'verified_at' => 'datetime',
            'password' => 'hashed',
            'rating' => 'decimal:2',
            'rating_count' => 'integer',
            'is_verified' => 'boolean',
        ];
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function rentalsAsRenter(): HasMany
    {
        return $this->hasMany(Rental::class, 'renter_id');
    }

    public function rentalsAsOwner(): HasMany
    {
        return $this->hasMany(Rental::class, 'owner_id');
    }

    public function transactionsAsBuyer(): HasMany
    {
        return $this->hasMany(Transaction::class, 'buyer_id');
    }

    public function transactionsAsSeller(): HasMany
    {
        return $this->hasMany(Transaction::class, 'seller_id');
    }

    public function getAvatarUrlAttribute(): string
    {
        return $this->avatar 
            ? asset('storage/avatars/' . $this->avatar)
            : 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&background=3b82f6&color=ffffff';
    }
}
