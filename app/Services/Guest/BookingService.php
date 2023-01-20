<?php

namespace App\Services\Guest;

use App\Http\Requests\Guest\Booking\StoreBookingRequest;

use App\Models\Booking;

use App\Repositories\Guest\BookingRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingService implements BookingRepository
{
    /**
     * Create a new service instance.
     * @param Booking  $model
     */
    public function __construct(private $model = Booking::class)
    {
    }

    /**
     * Store booking to database.
     * @param  \App\Http\Requests\Guest\Booking\StoreBookingRequest  $request
     * @return bool
     */
    public function storeBooking(StoreBookingRequest $request)
    {
        try {
            DB::beginTransaction();
            $payload = $request->validated();

            $passengers = $payload['passengers'];
            $seat_ids = $payload['seat_ids'];


            foreach ($passengers as $key => $passenger) {
                if ($key === 0) {
                    $data = [
                        'schedule_id' => $payload['schedule_id'],
                        'seat_id' => $seat_ids[$key],
                        'name' => $payload['name'],
                        'email' => $payload['email'],
                        'phone' => $payload['phone'],
                        'address' => $payload['address'],
                    ];

                    if (Auth::check()) {
                        $data['user_id'] = Auth::id();
                    }

                    $this->model::create($data);
                } else {
                    $this->model::create([
                        'schedule_id' => $payload['schedule_id'],
                        'seat_id' => $seat_ids[$key],
                        'name' => $passenger,
                        'email' => $payload['email'],
                        'phone' => $payload['phone'],
                        'address' => $payload['address'],
                    ]);
                }
            }


            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
