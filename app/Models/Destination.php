<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Destination extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'from_outlet_id',
        'to_outlet_id',
    ];

    public function fromOutlet()
    {
        return $this->belongsTo(Outlet::class, 'from_outlet_id', 'id');
    }

    public function toOutlet()
    {
        return $this->belongsTo(Outlet::class, 'to_outlet_id', 'id');
    }
}
