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

        if ($request->has('destination_id') && $request->has('departure_date')) {
            return $schedules->get()->toArray();
        }



        return [];
    }
}
