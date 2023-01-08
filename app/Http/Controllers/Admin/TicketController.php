<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Ticket\StoreTicketRequest;
use App\Http\Requests\Admin\Ticket\UpdateTicketRequest;
use App\Models\Destination;
use App\Models\Shuttle;

use App\Services\Admin\TicketService;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, TicketService $ticket)
    {
        return Inertia::render('Admin/Ticket', [
            'tickets' => $ticket->all($request),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $shuttles = Shuttle::available()->get();

        $destinations = Destination::all();

        return Inertia::render('Admin/Ticket/Create', ['shuttles' => $shuttles, 'destinations' => $destinations]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTicketRequest $request, TicketService $ticket)
    {
        return $ticket->create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, TicketService $ticket)
    {
        $ticket = $ticket->with(['shuttle:number_plate,id', 'fromDestination:name,name,city_type,id', 'toDestination:name,city_type,id'])->find($id);

        $shuttles = Shuttle::all();
        $destinations = Destination::all();

        return Inertia::render('Admin/Ticket/Edit', ['ticket' => $ticket, 'shuttles' => $shuttles, 'destinations' => $destinations]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTicketRequest $request, $id, TicketService $ticket)
    {
        return $ticket->update($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, TicketService $ticket)
    {
        return $ticket->delete($id);
    }
}
