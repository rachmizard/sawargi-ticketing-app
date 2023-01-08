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
        return $this->model::find($id);
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

            // 1. check if shuttle is available
            if ($ticket->shuttle->status != 'available') {
                DB::rollBack();

                return Redirect::route("admin.tickets.create")->with("error", "Shuttle is already picked with another schedule.");
            }

            // 2. create shuttle job
            $ticket->shuttle->shuttleJobs()->create([
                'ticket_id' => $ticket->id,
                'shuttle_id' => $ticket->shuttle_id,
                'status' => 'pending',
            ]);


            // 3. update shuttle status to unavailable
            $ticket->shuttle()->update(['status' => 'unavailable']);

            DB::commit();

            return Redirect::route("admin.tickets")->with("success", "Ticket created successfully.");
        } catch (\Exception $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function update($data, $id)
    {
        try {
            DB::beginTransaction();

            $ticket = $this->model::find($id);

            $newShuttleId = intval($data['shuttle_id']);

            // 1.1 if shuttle is changed
            if ($ticket->shuttle_id != $newShuttleId) {

                // 1.1.1 check if specified shuttle is available
                $shuttle = $ticket->shuttle->find($newShuttleId);

                if ($shuttle->status != 'available') {
                    DB::rollBack();

                    return Redirect::route("admin.tickets.show", $id)->with("error", "Shuttle " . $shuttle->number_plate . " is already picked with another schedule.");
                }

                // 1.1.2 set previous shuttle status to available
                $ticket->shuttle()->update(['status' => 'available']);

                // 1.1.3 set shuttle job to cancelled
                $ticket->shuttle->shuttleJobs()->update(['status' => 'cancelled']);

                // 1.1.4 create shuttle job for new shuttle
                $shuttle->shuttleJobs()->create([
                    'ticket_id' => $ticket->id,
                    'shuttle_id' => $shuttle->id,
                    'status' => 'pending',
                ]);

                // 1.1.5 set new shuttle status to unavailable
                $shuttle->update(['status' => 'unavailable']);
            }

            // 2. update ticket
            $ticket->update($data);

            DB::commit();

            return Redirect::route("admin.tickets")->with("success", "Ticket updated successfully.");
        } catch (\Exception $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function delete($id)
    {
        try {
            DB::beginTransaction();

            // 1. set back shuttle status to available
            $ticket = $this->model::find($id);
            $ticket->shuttle()->update(['status' => 'available']);

            // 3. final delete ticket
            $this->model::destroy($id);

            DB::commit();

            return Redirect::route('admin.tickets')->with('success', 'Ticket deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            throw $th;
        }
    }
}
