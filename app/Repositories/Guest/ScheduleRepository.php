<?php

namespace App\Repositories\Guest;

use Illuminate\Http\Request;

interface ScheduleRepository
{
    /**
     * Get all of the models from the database.
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function query(Request $request);

    /**
     * Find schedule by id.
     * @param  int  $id
     * @return \App\Models\Schedule
     */
    public function findScheduleById($id);
}
