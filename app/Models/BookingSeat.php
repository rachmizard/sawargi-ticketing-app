<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingSeat extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'seat_id',
        'user_id',
        'email',
        'phone',
        'name',
        'price',
        'is_paid',
        'is_cancelled',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'id');
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function scopeIsPaid($query)
    {
        return $query->where('is_paid', true);
    }

    public function scopeIsNotPaid($query)
    {
        return $query->where('is_paid', false);
    }

    public function scopeIsCancelled($query)
    {
        return $query->where('is_cancelled', true);
    }

    public function scopeIsNotCancelled($query)
    {
        return $query->where('is_cancelled', false);
    }
}
