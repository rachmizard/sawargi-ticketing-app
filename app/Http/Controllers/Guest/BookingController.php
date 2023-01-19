<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Services\Guest\ScheduleService;
use Illuminate\Http\Request;
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

    public function store(Request $request, ScheduleService $schedule)
    {
        dd($request->all());
    }
}
