<?php

namespace App\Services\Admin;

use App\Models\Ticket;
use App\Repositories\Admin\TicketRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class TicketService implements TicketRepository
{
    public function __construct(private $model = Ticket::class)
    {
    }

    public function all(Request $request)
    {
        $query = $this->query();
        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        $query->with(['shuttle', 'fromDestination', 'toDestination']);

        return $query->paginate($request->session()->get('per_page', 10));
    }

    public function find($id)
    {
    }

    public function paginate($perPage = 10)
    {
        return $this->model::paginate($perPage);
    }

    public function query()
    {
        return $this->model::query();
    }

    public function with($relations)
    {

        return $this->model::with($relations);
    }

    public function create($data)
    {
        try {
            DB::beginTransaction();

            $ticket = $this->model::create($data);

            // check if shuttle is available
            if ($ticket->shuttle->status != 'available') {
                DB::rollBack();

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

    public function update($data, $id)
    {
    }

    public function delete($id)
    {
        return $this->model::destroy($id);
    }
}
