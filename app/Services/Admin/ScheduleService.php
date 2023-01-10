<?php

namespace App\Services\Admin;

use App\Models\Schedule;
use App\Repositories\Admin\ScheduleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class ScheduleService implements ScheduleRepository
{
    public function __construct(private $model = Schedule::class)
    {
    }

    public function all(Request $request)
    {
        $query = $this->query();
        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        $query->withCount(
            [
                'seats as vacant_seats_count' => function ($query) {
                    $query->vacant();
                },
                'seats as booked_seats_count' => function ($query) {
                    $query->booked();
                },
            ]
        )->with(['shuttle', 'destination.fromOutlet:id,name,city', 'destination.toOutlet:id,name,city']);


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
        // TODO: Implement create() method.
        try {
            DB::beginTransaction();


            // 1. check if schedule is exacly same with another schedule
            $exists = $this->model::whereDestinationId($data['destination_id'])
                ->whereDepartureDate($data['departure_date'])
                ->exists();

            if ($exists) {
                DB::rollBack();
                return Redirect::route("admin.schedules.create")->with("error", "Schedule is already exists.");
            }

            $schedule = $this->model::create($data);

            // 2. check if shuttle is available
            if ($schedule->shuttle->status != 'available') {
                DB::rollBack();

                return Redirect::route("admin.schedules.create")->with("error", "Shuttle is already picked with another schedule.");
            }


            // 3. create shuttle job
            $schedule->shuttle->shuttleJobs()->create([
                'schedule_id' => $schedule->id,
                'shuttle_id' => $schedule->shuttle_id,
                'status' => 'pending',
            ]);


            // 4. update shuttle status to unavailable
            $schedule->shuttle()->update(['status' => 'unavailable']);

            // 5. create seats
            for ($i = 1; $i <= $schedule->shuttle->capacity; $i++) {
                $schedule->seats()->create([
                    'schedule_id' => $schedule->id,
                    'seat_number' => $i,
                    'status' => 'vacant',
                ]);
            }

            DB::commit();

            return Redirect::route("admin.schedules")->with("success", "Ticket created successfully.");
        } catch (\Exception $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function update($data, $id)
    {
        try {
            DB::beginTransaction();

            $schedule = $this->model::find($id);

            $newShuttleId = intval($data['shuttle_id']);

            // 1.1 if shuttle is changed
            if ($schedule->shuttle_id != $newShuttleId) {

                // 1.1.1 check if specified shuttle is available
                $shuttle = $schedule->shuttle->find($newShuttleId);

                if ($shuttle->status != 'available') {
                    DB::rollBack();

                    return Redirect::route("admin.schedules.show", $id)->with("error", "Shuttle " . $shuttle->number_plate . " is already picked with another schedule.");
                }

                // 1.1.2 set previous shuttle status to available
                $schedule->shuttle()->update(['status' => 'available']);

                // 1.1.3 set shuttle job to cancelled
                $schedule->shuttle->shuttleJobs()->update(['status' => 'cancelled']);

                // 1.1.4 create shuttle job for new shuttle
                $shuttle->shuttleJobs()->create([
                    'schedule_id' => $schedule->id,
                    'shuttle_id' => $shuttle->id,
                    'status' => 'pending',
                ]);

                // 1.1.5 set new shuttle status to unavailable
                $shuttle->update(['status' => 'unavailable']);

                // 1.1.6 update schedule shuttle id
                $schedule->update(['shuttle_id' => $newShuttleId]);

                // 1.1.7 remove old seats
                $schedule->seats()->delete();

                // 1.1.8 create new seats
                for ($i = 1; $i <= $shuttle->capacity; $i++) {
                    $schedule->seats()->create([
                        'schedule_id' => $schedule->id,
                        'seat_number' => $i,
                        'status' => 'vacant',
                    ]);
                }
            }

            // 2. update ticket
            $schedule->update($data);

            DB::commit();

            return Redirect::route("admin.schedules")->with("success", "Ticket updated successfully.");
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
            $schedule = $this->model::find($id);
            $schedule->shuttle()->update(['status' => 'available']);

            // 3. final delete ticket
            $this->model::destroy($id);

            DB::commit();

            return Redirect::route('admin.schedules')->with('success', 'Ticket deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            throw $th;
        }
    }
}
