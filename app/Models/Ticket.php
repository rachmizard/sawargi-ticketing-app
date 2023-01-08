<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

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
}
