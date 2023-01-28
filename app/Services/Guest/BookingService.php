<?php

namespace App\Services\Guest;

use App\Http\Requests\Guest\Booking\StoreBookingRequest;
use App\Http\Requests\Guest\Booking\StorePayBookingRequest;
use App\Models\Booking;

use App\Repositories\Guest\BookingRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookingService implements BookingRepository
{
    /**
     * Create a new service instance.
     * @param Booking  $model
     */
    public function __construct(public $model = Booking::class)
    {
    }

    public function __invoke()
    {
        return $this;
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

            $booking->schedule
                ->seats()
                ->whereIn('id', $booking->bookingSeats->pluck('seat_id')->toArray())
                ->update([
                    'status' => 'booked',
                ]);

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

    /**
     * Find booking by id.
     * @param  int  $id
     * @return object $booking
     */
    public function findBookingByIdAndStatusIsPending($id)
    {
        return $this->model::with(
            'bookingSeats.seat',
            'bookingPayments',
            'schedule.destination.fromOutlet',
            'schedule.destination.toOutlet',
            'schedule.shuttle',
        )
            ->whereId($id)
            ->whereIn('status', ['pending', 'success'])
            ->whereHas('bookingPayments', function ($query) {
                $query->whereIn('status', ['pending', 'success']);
            })
            ->first();
    }


    /**
     * Pay booking by id.
     * @param  int  $id
     * @param  \App\Http\Requests\Guest\Booking\StorePayBookingRequest  $request
     * @return object $booking
     */
    public function payBookingById($id, StorePayBookingRequest $request)
    {
        try {
            DB::beginTransaction();

            $booking = $this->findBookingByIdAndStatusIsPending($id);

            if (!$booking) {
                return null;
            }

            $fileStored = $request->file('transfer_proof')->store('transfer_proof');

            $booking->bookingPayments()->update([
                'transfer_proof_url' => $fileStored,
                'paid_at' => Carbon::now(),
            ]);

            DB::commit();

            return $booking;
        } catch (\Throwable $th) {
            DB::rollBack();

            // remove transfer proof file
            if ($request->hasFile('transfer_proof')) {
                $request->file($fileStored)->delete();
            }

            throw $th;
        }
    }

    public function setExpiredById($id)
    {
        try {
            DB::beginTransaction();
            $booking = $this->model::with('bookingPayments', 'bookingSeats')->findOrFail($id);

            if (!$booking) {
                return null;
            }

            $booking->bookingPayments->update([
                'status' => 'failed',
                'expired_at' => Carbon::now(),
            ]);

            $booking->bookingSeats->update([
                'is_cancelled' => true,
            ]);

            $booking->schedule
                ->seats()
                ->whereIn('id', $booking->bookingSeats->pluck('seat_id')->toArray())
                ->update([
                    'status' => 'vacant',
                ]);

            $booking->update([
                'status' => 'cancelled',
            ]);

            DB::commit();
            return $booking;
        } catch (\Throwable $th) {
            throw $th;
            DB::rollBack();
        }
    }
}
