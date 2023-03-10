<?php

namespace App\Services\Guest;

use App\Models\Schedule;

use App\Repositories\Guest\ScheduleRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ScheduleService implements ScheduleRepository
{

    /**
     * Create a new service instance.
     * @param Schedule  $model
     */
    public function __construct(private $model = Schedule::class)
    {
    }

    /**
     * Get all of the models from the database.
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function query(Request $request)
    {
        $schedules = $this->model::query();

        $schedules->with(
            [
                'destination.fromOutlet' => function ($query) {
                    $query->select('id', 'name');
                },
                'destination.toOutlet' => function ($query) {
                    $query->select('id', 'name');
                },
                'shuttle' => function ($query) {
                    $query->select('id', 'number_plate');
                },
            ]
        )
            ->withCount([
                'seats as available_seats' => function ($query) {
                    $query->vacant();
                }
            ])
            ->orderBy('departure_date', 'ASC');


        if ($request->has('destination_id')) {
            $schedules->where('destination_id', $request->destination_id);
        }

        if ($request->has('departure_date')) {

            $currentDateIsEqualNow = Carbon::parse($request->departure_date)->format('Y-m-d') == Carbon::now()->format('Y-m-d');

            if ($currentDateIsEqualNow) {
                $schedules->whereBetween('departure_date', [
                    Carbon::parse($request->departure_date)->format('Y-m-d H:i'),
                    Carbon::parse($request->departure_date)->endOfDay()->format('Y-m-d H:i')
                ]);
            } else {
                $schedules->whereBetween('departure_date', [
                    Carbon::parse($request->departure_date)->startOfDay()->format('Y-m-d H:i'),
                    Carbon::parse($request->departure_date)->endOfDay()->format('Y-m-d H:i')
                ]);
            }
        }


        if ($request->has('destination_id') && $request->has('departure_date') && $request->has('passenger')) {

            // optional
            // $schedules->having('available_seats', '>=', $request->passenger);

            return $schedules->get()->toArray();
        }



        return [];
    }

    /**
     * Find schedule by id.
     * @param  int  $id
     * @return \App\Models\Schedule
     */
    public function findScheduleById($id)
    {
        return $this->model::with([
            'destination.fromOutlet' => function ($query) {
                $query->select('id', 'name', 'address');
            },
            'destination.toOutlet' => function ($query) {
                $query->select('id', 'name', 'address');
            },
            'shuttle' => function ($query) {
                $query->select('id', 'number_plate');
            },
            'seats' => function ($query) {
                $query->select('id', 'schedule_id', 'seat_number', 'status');
            },
        ])
            ->withCount([
                'seats as available_seats' => function ($query) {
                    $query->vacant();
                }
            ])
            ->findOrFail($id);
    }
}
