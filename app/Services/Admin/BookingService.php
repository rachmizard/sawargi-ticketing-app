<?php

namespace App\Services\Admin;

use App\Http\Requests\Admin\Booking\UpdateBookingPaymentRequest;
use App\Models\Booking;
use App\Repositories\Admin\BookingRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingService implements BookingRepository
{
    /**
     * BookingService constructor.
     * @param Booking $model
     */
    public function __construct(public $model = Booking::class)
    {
    }


    /**
     * Query builder
     * @return Builder
     */
    public function query()
    {
        return $this->model::query();
    }


    public function all(Request $request)
    {
        $query = $this->query()
            ->with(['bookingPayments'])
            ->join('schedules', 'bookings.schedule_id', '=', 'schedules.id')

            ->join('destinations', 'schedules.destination_id', '=', 'destinations.id')

            ->join('outlets as from_outlets', 'destinations.from_outlet_id', '=', 'from_outlets.id')
            ->join('outlets as to_outlets', 'destinations.to_outlet_id', '=', 'to_outlets.id')

            ->join('booking_seats', 'bookings.id', '=', 'booking_seats.booking_id')

            ->select(
                'bookings.*',

                'schedules.price as schedule_price',
                'schedules.departure_date',
                'schedules.arrival_date',

                'from_outlets.name as from_outlet_name',
                'to_outlets.name as to_outlet_name',

                DB::raw('count(booking_seats.id) as passenger_count'),


            );


        if ($request->has('status')) {
            $query->whereHas('bookingPayments', function ($query) use ($request) {
                $arrayStatusPayment = [];

                if (in_array('pending', $request->status)) {
                    $arrayStatusPayment[] = 'pending';
                }

                if (in_array('complete', $request->status)) {
                    $arrayStatusPayment[] = 'success';
                }

                if (in_array('cancelled', $request->status)) {
                    $arrayStatusPayment[] = 'failed';
                }

                $query->whereIn('status', $arrayStatusPayment);
            });

            $query->whereIn('bookings.status', $request->status);
        } else {
            $query->orWhereHas('bookingPayments', function ($query) {
                $query->pending();
            });
        }

        if ($request->has('customer_name')) {
            $query->orWhere('bookings.name', 'LIKE', '%' . $request->customer_name . '%');
        }

        if ($request->has('payment_method')) {
            $query->whereHas('bookingPayments', function ($query) use ($request) {
                $query->where('method', $request->payment_method);
            });
        }

        $query
            ->groupBy('bookings.id')
            ->orderBy('bookings.created_at', 'desc');

        return $query->paginate($request->session()->get('per_page', 10))->toArray();
    }

    /**
     * Confirmation booking payment
     * @param int $id
     * @param UpdateBookingPaymentRequest $request
     * @return mixed
     */
    public function updateBookingPayment(int $id, UpdateBookingPaymentRequest $request)
    {
        try {
            DB::beginTransaction();

            $payload = $request->validated();

            $booking = $this->query()->findOrFail($id);


            if ($payload['method'] === 'transfer') {
                $booking->bookingPayments()
                    ->pending()
                    ->transferProofUrl()
                    ->update([
                        'status' => $payload['payment_status'],
                    ]);
            }

            if ($payload['method'] === 'cash') {
                $booking->bookingPayments()
                    ->pending()
                    ->update([
                        'status' => $payload['payment_status'],
                        'paid_at' => Carbon::now(),
                    ]);
            }


            if ($payload['payment_status'] === 'failed') {
                $booking->schedule->seats()
                    ->whereIn('id', $booking->bookingSeats->pluck('seat_id')->toArray())
                    ->whereScheduleId($booking->schedule_id)
                    ->update([
                        'status' => 'vacant'
                    ]);
            }


            $booking->bookingSeats()->update([
                'is_paid' => $payload['payment_status'] === 'success' ? true : false,
                'is_cancelled' => $payload['payment_status'] === 'failed' ? true : false,
            ]);

            $booking->update([
                'status' => $payload['status'],
            ]);

            DB::commit();

            return $booking;
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
