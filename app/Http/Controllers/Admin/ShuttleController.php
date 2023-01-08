<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShuttleRequest;
use App\Http\Requests\UpdateShuttleRequest;
use App\Models\Shuttle;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ShuttleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Shuttle::query();

        $query->orderBy('created_at', 'desc');

        if ($request->has('per_page')) {
            $request->session()->put('per_page', $request->get('per_page'));
        }

        return Inertia::render('Admin/Shuttle', [
            'shuttles' => $query->paginate($request->session()->get('per_page', 10))
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
     * @param  \App\Http\Requests\StoreShuttleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreShuttleRequest $request)
    {
        Shuttle::create($request->validated());
        return Redirect::route('admin.shuttles')->with('message', 'Shuttle created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Shuttle  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function show(Shuttle $shuttle)
    {
        return Inertia::render('Admin/Shuttle/Edit', [
            'shuttle' => $shuttle
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateShuttleRequest  $request
     * @param  \App\Models\Shuttle  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateShuttleRequest $request, Shuttle $shuttle)
    {
        $shuttle->update($request->validated());
        return Redirect::route('admin.shuttles')->with('message', 'Shuttle updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shuttle  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shuttle $shuttle)
    {
        $shuttle->delete();
        return Redirect::route('admin.shuttles')->with('message', 'Shuttle deleted successfully.');
    }
}
