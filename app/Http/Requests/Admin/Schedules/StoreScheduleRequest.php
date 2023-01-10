<?php

namespace App\Http\Requests\Admin\Schedules;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreScheduleRequest extends FormRequest
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
            'destination_id' => 'required|exists:destinations,id',
            'shuttle_id' => 'required|exists:shuttles,id',
            'departure_date' => 'required|date',
            'arrival_date' => 'required|date',
            'price' => 'required|integer',
            'status' => 'required|in:pending,otw,arrived,cancelled',
        ];
    }
}
