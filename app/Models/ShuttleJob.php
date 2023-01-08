<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShuttleJob extends Model
{
    use HasFactory;

    protected $fillable = [
        'shuttle_id',
        'ticket_id',
        'status',
    ];

    public function shuttle()
    {
        return $this->belongsTo(Shuttle::class, 'shuttle_id', 'id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'id');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeOtw($query)
    {
        return $query->where('status', 'otw');
    }

    public function scopeDone($query)
    {
        return $query->where('status', 'done');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function scopeByShuttle($query, $shuttle_id)
    {
        return $query->where('shuttle_id', $shuttle_id);
    }

    public function scopeByTicket($query, $ticket_id)
    {
        return $query->where('ticket_id', $ticket_id);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
