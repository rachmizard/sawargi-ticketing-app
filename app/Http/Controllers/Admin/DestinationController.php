<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Destination\StoreDestinationRequest;
use App\Http\Requests\Admin\Destination\UpdateDestinationRequest;

use App\Models\Outlet;
use App\Models\Shuttle;
use App\Services\Admin\DestinationService;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, DestinationService $destination)
    {
        return Inertia::render('Admin/Destination', [
            'destinations' => $destination->all($request),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $outlets = Outlet::all();
        $shuttles = Shuttle::available()->get();

        return Inertia::render('Admin/Destination/Create', ['outlets' => $outlets, 'shuttles' => $shuttles]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Destination\StoreDestinationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDestinationRequest $request, DestinationService $destination)
    {
        return $destination->create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function show($id, DestinationService $destinationService)
    {

        $outlets = Outlet::all();
        $shuttles = Shuttle::all();

        return Inertia::render('Admin/Destination/Edit', [
            'destination' => $destinationService->with(['fromOutlet:id,city'])->find($id),
            'outlets' => $outlets,
            'shuttles' => $shuttles
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $destination
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\Destination\UpdateDestinationRequest  $request
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDestinationRequest $request, $id, DestinationService $destinationService)
    {
        return $destinationService->update($request->validated(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Destination  $destination
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, DestinationService $destinationService)
    {
        $destinationService->delete($id);
        return Redirect::route('admin.destinations')->with('message', 'Destination deleted successfully');
    }
}
