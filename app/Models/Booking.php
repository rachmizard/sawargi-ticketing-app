<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;


    protected $fillable = [
        'schedule_id',
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'status',
        'total_price'
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function bookingSeats()
    {
        return $this->hasMany(BookingSeat::class, 'booking_id', 'id');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function calculateTotalPriceAndSave()
    {
        $totalPrice = 0;
        foreach ($this->bookingSeats as $bookingSeat) {
            $totalPrice += $bookingSeat->price;
        }
        $this->total_price = $totalPrice;
        $this->save();
    }
}
