<?php

namespace App\Http\Requests\Guest\Booking;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
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
            'schedule_id' => 'required|integer|exists:schedules,id',
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'passengers' => 'required|array|min:1',
            'seat_ids' => 'required|array|exists:seats,id',
            'seat_id.*' => function ($attribute, $value, $fail) {
                if (count($this->passengers) !== count($value)) {
                    $fail('Seat count is not equal to passenger count.');
                }
            },
            "payment_method" => "required|string|in:cash,transfer",
        ];
    }
}
