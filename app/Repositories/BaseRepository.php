<?php

namespace App\Repositories;

use Illuminate\Http\Request;

interface BaseRepository
{
    public function all(Request $request);

    public function query();

    public function paginate($perPage = 10);

    public function find($id);

    public function create($data);

    public function update($data, $id);

    public function delete($id);

    public function with($relations);
}
