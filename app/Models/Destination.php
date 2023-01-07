<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city_type',
    ];

    protected $casts = [
        'city_type' => 'string',
    ];

    public function getCityTypeAttribute($value)
    {
        return ucfirst($value);
    }

    public function setCityTypeAttribute($value)
    {
        $this->attributes['city_type'] = strtolower($value);
    }

    public function scopeJakarta($query)
    {
        return $query->where('city_type', 'jakarta');
    }

    public function scopeBandung($query)
    {
        return $query->where('city_type', 'bandung');
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city_type', $city);
    }
}
