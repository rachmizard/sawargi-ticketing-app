<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'destination_id',
        'shuttle_id',
        'departure_date',
        'arrival_date',
        'price',
        'status',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class, 'destination_id', 'id');
    }

    public function shuttle()
    {
        return $this->belongsTo(Shuttle::class, 'shuttle_id', 'id');
    }

    public function fromOutlet()
    {
        return $this->belongsTo(Outlet::class, 'from_outlet_id');
    }

    public function toOutlet()
    {
        return $this->belongsTo(Outlet::class, 'to_outlet_id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeOtw($query)
    {
        return $query->where('status', 'otw');
    }

    public function scopeArrived($query)
    {
        return $query->where('status', 'arrived');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
