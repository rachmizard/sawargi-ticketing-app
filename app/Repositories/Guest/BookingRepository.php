<?php

namespace App\Repositories\Guest;

use App\Http\Requests\Guest\Booking\StoreBookingRequest;
use App\Http\Requests\Guest\Booking\StorePayBookingRequest;

interface BookingRepository
{
    /**
     * Store booking to database.
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Models\Booking
     */
    public function storeBooking(StoreBookingRequest $request);

    /**
     * Find booking by id and the status is pending.
     * @param  int  $id
     * @return object $booking
     */
    public function findBookingByIdAndStatusIsPending($id);

    /**
     * Pay booking by id.
     * @param  int  $id
     * @param  StorePayBookingRequest  $request
     * @return object $booking
     */
    public function payBookingById($id, StorePayBookingRequest $request);


    /**
     * Set booking expired by id.
     * @param  int  $id
     * @return object $booking
     */
    public function setExpiredById($id);
}
