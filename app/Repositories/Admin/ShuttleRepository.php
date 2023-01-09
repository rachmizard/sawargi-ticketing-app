<?php

namespace App\Repositories\Admin;

use App\Repositories\BaseRepository;

use Illuminate\Http\Request;

interface ShuttleRepository extends BaseRepository
{
    public function all(Request $request);

    public function create($data);

    public function query();

    public function with($relations);

    public function update($data, $id);

    public function delete($id);

    public function find($id);
}
