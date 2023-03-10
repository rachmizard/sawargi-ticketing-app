<?php

namespace App\Repositories\Guest;

use Illuminate\Http\Request;

interface DestinationRepository
{
    /**
     * Get all of the models from the database.
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function query(Request $request);
}
