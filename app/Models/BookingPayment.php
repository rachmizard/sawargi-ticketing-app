<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'method',
        'transfer_proof_url',
        'status',
        'paid_at',
        'expired_at',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeSuccess($query)
    {
        return $query->where('status', 'success');
    }

    public function scopeFailed($query)
    {
        return $query->where('status', 'failed');
    }

    public function scopeCash($query)
    {
        return $query->where('method', 'cash');
    }

    public function scopeTransfer($query)
    {
        return $query->where('method', 'transfer');
    }
}
