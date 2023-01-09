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
        'seat_number',
        'status',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function scopeVacant($query)
    {
        return $query->where('status', 'vacant');
    }

    public function scopeBooked($query)
    {
        return $query->where('status', 'booked');
    }
}