<?php

namespace App\Services\Admin;

use App\Models\Shuttle;

use App\Repositories\Admin\ShuttleRepository;

use Illuminate\Http\Request;

class ShuttleService implements ShuttleRepository
{

    public function __construct(private $model = Shuttle::class)
    {
    }

    public function all(Request $request)
    {
        $query = $this->query();

        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->byStatus($request->get('status'));
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

    public function paginate($perPage = 10)
    {
        return $this->model::paginate($perPage);
    }
}
