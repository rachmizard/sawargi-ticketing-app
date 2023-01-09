<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "address",
        "city",
        "phone",
        "status",
    ];

    protected $casts = [
        "city" => "string",
        "status" => "string",
    ];

    public function getCityAttribute($value)
    {
        return ucfirst($value);
    }

    public function getStatusAttribute($value)
    {
        return ucfirst($value);
    }


    public function setCityAttribute($value)
    {
        $this->attributes["city"] = strtolower($value);
    }

    public function setStatusAttribute($value)
    {
        $this->attributes["status"] = strtolower($value);
    }

    public function scopeOpen($query)
    {
        return $query->where("status", "open");
    }

    public function scopeClosed($query)
    {
        return $query->where("status", "closed");
    }

    public function scopeJakarta($query)
    {
        return $query->where("city", "jakarta");
    }

    public function scopeBandung($query)
    {
        return $query->where("city", "bandung");
    }

    public function scopeCity($query, $city)
    {
        return $query->where("city", $city);
    }
}
