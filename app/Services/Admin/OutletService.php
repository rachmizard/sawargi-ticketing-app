<?php

namespace App\Services\Admin;

use App\Models\Outlet;
use App\Repositories\Admin\OutletRepository;
use Illuminate\Http\Request;

class OutletService implements OutletRepository
{
    public function __construct(private $model = Outlet::class)
    {
    }

    public function all(Request $request)
    {
        $query = $this->query();

        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        if ($request->has('city') && $request->get('city') !== 'all') {
            $query->city($request->get('city'));
        }

        return $query->paginate($request->session()->get('per_page', 10));
    }

    public function create($data)
    {
        return $this->model::create($data);
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
        return $this->find($id)->update($data);
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
