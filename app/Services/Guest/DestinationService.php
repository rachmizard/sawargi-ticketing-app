<?php

namespace App\Services\Guest;

use App\Models\Destination;
use App\Repositories\Guest\DestinationRepository;
use Illuminate\Http\Request;

class DestinationService implements DestinationRepository
{

    /**
     * Create a new service instance.
     * @param Destination  $model
     */
    public function __construct(private $model = Destination::class)
    {
    }

    /**
     * Get all of the models from the database.
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function query(Request $request)
    {
        return $this->model::with(['fromOutlet:id,name,city', 'toOutlet:id,name,city'])->orderBy('created_at', 'DESC')->get()->toArray();
    }
}
