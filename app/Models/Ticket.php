<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_destination_id',
        'to_destination_id',
        'shuttle_id',
        'price',
        'depart_date',
        'arrival_date',
    ];

    public function fromDestination()
    {
        return $this->belongsTo(Destination::class, 'from_destination_id');
    }

    public function toDestination()
    {
        return $this->belongsTo(Destination::class, 'to_destination_id');
    }

    public function shuttle()
    {
        return $this->belongsTo(Shuttle::class);
    }

    public function passengers()
    {
        return $this->hasMany(Passenger::class);
    }

    public function getDepartDateAttribute($value)
    {
        return date('d-m-Y H:i', strtotime($value));
    }

    public function getArrivalDateAttribute($value)
    {
        return date('d-m-Y H:i', strtotime($value));
    }

    public function getCreatedAtAttribute($value)
    {
        return date('d-m-Y H:i', strtotime($value));
    }

    public function getUpdatedAtAttribute($value)
    {
        return date('d-m-Y H:i', strtotime($value));
    }
}
