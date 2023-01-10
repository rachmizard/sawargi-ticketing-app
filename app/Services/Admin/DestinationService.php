<?php

namespace App\Services\Admin;

use App\Models\Destination;
use App\Models\Shuttle;
use App\Repositories\Admin\DestinationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DestinationService implements DestinationRepository
{
    public function __construct(private $model = Destination::class)
    {
    }

    public function all(Request $request)
    {
        $query = $this->with(['fromOutlet:id,name', 'toOutlet:id,name']);

        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        if ($request->has('city') && $request->get('city') !== 'all') {
            $query->byCity($request->get('city'));
        }


        return $query->paginate($request->session()->get('per_page', 10));
    }

    public function create($data)
    {
        $this->model::create($data);
        return redirect()->route("admin.destinations")->with('success', 'Destination created successfully');
    }

    public function query()
    {
        return $this->model::query();
    }

    public function with($relations)
    {
        return $this->model::with($relations);
    }

    public function update($data, $id)
    {
        $destination = $this->find($id);
        $destination->update($data);

        return Redirect::route("admin.destinations")->with('success', 'Destination updated successfully');
    }

    public function delete($id)
    {
        return $this->model::destroy($id);
    }

    public function find($id)
    {
        return $this->model::find($id);
    }

    public function findBy($field, $value)
    {
        return $this->model::where($field, $value)->first();
    }

    public function paginate($perPage = 10)
    {
        return $this->model::paginate($perPage);
    }

    public function orderBy($column, $direction = 'asc')
    {
        return $this->model::orderBy($column, $direction);
    }
}
