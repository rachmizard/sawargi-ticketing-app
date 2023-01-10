<?php

namespace App\Http\Requests\Admin\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'from_destination_id' => 'required|exists:destinations,id',
            'to_destination_id' => 'required|exists:destinations,id',
            'shuttle_id' => 'required|exists:shuttles,id',
            'price' => 'required|numeric|min:1000',
            'departure_date' => 'required|date',
            'arrival_date' => 'required|date',
        ];
    }
}
