<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'invoice_date',
        'due_date',
        'user_ticket_id'
    ];

    public function userTicket()
    {
        return $this->belongsTo(UserTicket::class, 'user_ticket_id', 'id');
    }
}
