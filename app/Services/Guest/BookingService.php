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
     * @return Booking
     */
    public function storeBooking(StoreBookingRequest $request)
    {
        try {
            DB::beginTransaction();
            $payload = $request->validated();

            $passengers = $payload['passengers'];
            $seat_ids = $payload['seat_ids'];

            $data = [
                'schedule_id' => $payload['schedule_id'],
                'email' => $payload['email'],
                'phone' => $payload['phone'],
                'name' => $payload['name'],
                'address' => $payload['address'],
            ];

            if (Auth::check()) {
                $data['user_id'] = Auth::id();
            }

            $booking = $this->model::create($data);

            foreach ($passengers as $key => $passenger) {
                $booking_seat_data = [
                    'booking_id' => $booking->id,
                    'seat_id' => $seat_ids[$key],
                    'email' => $payload['email'],
                    'phone' => $payload['phone'],
                    'name' => $key === 0 ? $payload['name'] : $passenger,
                    'price' => $booking->schedule->price ?? 0,
                ];

                if (Auth::check()) {
                    $booking_seat_data['user_id'] = Auth::id();
                }

                $booking->bookingSeats()->create($booking_seat_data);
            }

            $booking->calculateTotalPriceAndSave();

            $booking->bookingPayments()->create([
                'method' => $payload['payment_method'],
                'status' => 'pending',
                'expired_at' => now()->addMinutes(30),
            ]);

            DB::commit();

            return $booking;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
