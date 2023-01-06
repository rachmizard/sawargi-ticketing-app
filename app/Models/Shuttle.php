<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shuttle extends Model
{
    use HasFactory;

    protected $fillable = [
        'number_plate',
        'capacity',
        'status',
    ];

    public function shuttleJobs()
    {
        return $this->hasMany(ShuttleJob::class, 'shuttle_id', 'id');
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeNotAvailable($query)
    {
        return $query->where('status', 'not available');
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
