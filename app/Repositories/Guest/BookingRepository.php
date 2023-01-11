<?php

namespace App\Repositories\Guest;

use App\Http\Requests\Guest\Booking\StoreBookingRequest;

interface BookingRepository
{
    /**
     * Store booking to database.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response 
     */
    public function storeBooking(StoreBookingRequest $request);
}
