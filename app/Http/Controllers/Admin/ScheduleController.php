<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Schedules\StoreScheduleRequest;
use App\Http\Requests\Admin\Schedules\UpdateScheduleRequest;
use App\Services\Admin\DestinationService;
use App\Services\Admin\ScheduleService;
use App\Services\Admin\ShuttleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Services\Admin\ScheduleService  $schedule
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ScheduleService $schedule)
    {
        return Inertia::render('Admin/Schedule', [
            'schedules' => $schedule->all($request),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Services\Admin\ShuttleService  $shuttle
     * @param  \App\Services\Admin\DestinationService  $destination
     * 
     * @return \Illuminate\Http\Response
     */
    public function create(ShuttleService $shuttle, DestinationService $destination)
    {

        $shuttles = $shuttle->model::available()->get();
        $destinations = $destination->model::with(['fromOutlet:id,name,city', 'toOutlet:id,name,city'])->get();

        return Inertia::render('Admin/Schedule/Create', [
            'shuttles' => $shuttles->toArray(),
            'destinations' => $destinations->toArray(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Schedules\StoreScheduleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreScheduleRequest $request, ScheduleService $schedule)
    {
        return $schedule->create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @param   \App\Services\Admin\ScheduleService  $schedule
     * @param   \App\Services\Admin\ShuttleService  $shuttle
     * @param   \App\Services\Admin\DestinationService  $destination
     * @return  \Illuminate\Http\Response
     */
    public function show($id, ScheduleService $schedule, ShuttleService $shuttle, DestinationService $destination)
    {
        return Inertia::render('Admin/Schedule/Edit', [
            'schedule' => $schedule->find($id),
            'shuttles' => $shuttle->model::all()->toArray(),
            'destinations' => $destination->model::with(['fromOutlet:id,name,city', 'toOutlet:id,name,city'])->get()->toArray()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(String $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\Admin\Schedules\UpdateScheduleRequest  $request
     * @param  string  $id
     * @param \App\Services\Admin\ScheduleService  $schedule
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateScheduleRequest $request, $id, ScheduleService $scheduleService)
    {
        return $scheduleService->update($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @param  \App\Services\Admin\ScheduleService  $schedule
     * @return \Illuminate\Http\Response
     */
    public function destroy(String $id, ScheduleService $schedule)
    {
        return $schedule->delete($id);
    }
}
