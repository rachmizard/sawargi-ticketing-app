<?php

namespace App\Http\Controllers;

use App\Services\Guest\DestinationService;
use App\Services\Guest\ScheduleService;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param \Illuminate\Http\Request $request
     * @param  \App\Services\Guest\DestinationService $booking
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, DestinationService $destination, ScheduleService $schedule)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'destinations' => $destination->query($request),
            'schedules' => $schedule->query($request),
        ]);
    }
}
