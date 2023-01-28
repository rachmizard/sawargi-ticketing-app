<?php

namespace App\Http\Requests\Guest\Booking;

use Illuminate\Foundation\Http\FormRequest;

class StorePayBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'booking_id' => 'required|integer|exists:bookings,id',
            'transfer_proof' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
