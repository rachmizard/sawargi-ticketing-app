<?php

namespace App\Services\Guest;

use App\Http\Requests\Guest\Booking\StoreBookingRequest;

use App\Models\Booking;
use App\Models\Destination;

use App\Repositories\Guest\BookingRepository;

use Illuminate\Support\Facades\Redirect;

class BookingService implements BookingRepository
{
    /**
     * Create a new service instance.
     * @param Booking  $model
     * @param Destination  $destinationModel
     */
    public function __construct(private $model = Booking::class, private $destinationModel = Destination::class)
    {
    }

    /**
     * Store booking to database.
     * @param  \App\Http\Requests\Guest\Booking\StoreBookingRequest  $request
     * @return \Illuminate\Http\Response 
     */
    public function storeBooking(StoreBookingRequest $request)
    {
        $this->model::create($request->validated());

        return Redirect::route('booking.index')->with('success', 'Booking created successfully.');
    }
}
