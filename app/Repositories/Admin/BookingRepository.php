<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\Booking\UpdateBookingPaymentRequest;
use Illuminate\Http\Request;

interface BookingRepository
{
    /**
     * Get all bookings with pagination
     * @param Request $request
     * @return mixed
     */
    public function all(Request $request);

    /**
     * Confirmation booking payment
     * @param int $id
     * @param UpdateBookingPaymentRequest $request
     * @return mixed
     */
    public function updateBookingPayment(int $id, UpdateBookingPaymentRequest $request);
}
