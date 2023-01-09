<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\Admin\Shuttle\StoreShuttleRequest;
use App\Http\Requests\Admin\Shuttle\UpdateShuttleRequest;

use App\Services\Admin\ShuttleService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ShuttleController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Services\Admin\ShuttleService  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, ShuttleService $shuttle)
    {
        return Inertia::render('Admin/Shuttle', [
            'shuttles' => $shuttle->all($request),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Shuttle/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Shuttle\StoreShuttleRequest  $request
     * @param  \App\Services\Admin\ShuttleService  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function store(StoreShuttleRequest $request, ShuttleService $shuttle)
    {
        $shuttle->create($request->validated());
        return Redirect::route('admin.shuttles')->with('message', 'Shuttle created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @param  \App\Services\Admin\ShuttleService  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function show($id, ShuttleService $shuttle)
    {
        return Inertia::render('Admin/Shuttle/Edit', [
            'shuttle' => $shuttle->find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Shuttle\UpdateShuttleRequest  $request
     * @param  string  $id
     * @param  \App\Services\Admin\ShuttleService  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateShuttleRequest $request, $id, ShuttleService $shuttle)
    {
        $shuttle->update($request->validated(), $id);

        return Redirect::route('admin.shuttles')->with('message', 'Shuttle updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @param  \App\Services\Admin\ShuttleService  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, ShuttleService $shuttle)
    {
        $shuttle->delete($id);

        return Redirect::route('admin.shuttles')->with('message', 'Shuttle deleted successfully.');
    }
}
