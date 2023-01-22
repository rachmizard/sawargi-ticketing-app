<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\Booking\StoreBookingRequest;
use App\Services\Guest\BookingService;
use App\Services\Guest\ScheduleService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Show the form for creating a new resource.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ScheduleService $schedule)
    {
        return Inertia::render('Guest/Booking', [
            'schedule' => $schedule->findScheduleById($request->get("scheduleId")),
        ]);
    }

    public function store(StoreBookingRequest $request, BookingService $booking)
    {
        try {
            $storedBooking = $booking->storeBooking($request);

            return Redirect::route('booking.payment', $storedBooking->id)->with('success', 'Booking berhasil, silahkan lakukan pembayaran.');
        } catch (\Throwable $th) {
            return Redirect::back()->with('error', 'Booking failed please try again later or call some administrator.');
        }
    }

    public function show($id)
    {
        //
    }

    public function payment(int $id, BookingService $booking)
    {
        $booking = $booking->findBookingByIdAndStatusIsPending($id);

        if (!$booking) {
            return Redirect::route('welcome')->with('error', 'Pemesanan tidak ditemukan atau sudah dibayar atau mungkin gagal.');
        }

        return Inertia::render('Guest/Booking/Payment', [
            'booking' => $booking->toArray(),
        ]);
    }
}
