<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Ticket\StoreTicketRequest;
use App\Models\Destination;
use App\Models\Shuttle;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Ticket::query();

        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        $query->with(['shuttle', 'fromDestination', 'toDestination']);

        return Inertia::render('Admin/Ticket', [
            'tickets' => $query->paginate($request->session()->get('per_page', 10))
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
    public function store(StoreTicketRequest $request)
    {
        try {
            DB::beginTransaction();

            $ticket = Ticket::create($request->validated());

            // check if shuttle is available
            if ($ticket->shuttle->status != 'available') {
                return Redirect::route("admin.tickets.create")->with("error", "Shuttle is already picked with another schedule.");
            }

            // create shuttle job
            $ticket->shuttle->shuttleJobs()->create([
                'ticket_id' => $ticket->id,
                'shuttle_id' => $ticket->shuttle_id,
                'status' => 'pending',
            ]);

            $ticket->shuttle()->update(['status' => 'unavailable']);

            DB::commit();

            return Redirect::route("admin.tickets")->with("message", "Ticket created successfully.");
        } catch (\Exception $th) {
            DB::rollBack();
            return Redirect::route("admin.tickets.create")->with("error", "Something went wrong.");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
