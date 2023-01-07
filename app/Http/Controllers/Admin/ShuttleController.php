<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShuttleRequest;
use App\Http\Requests\UpdateShuttleRequest;
use App\Models\Shuttle;

class ShuttleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreShuttleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreShuttleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Shuttle  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function show(Shuttle $shuttle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Shuttle  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function edit(Shuttle $shuttle)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shuttle  $shuttle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shuttle $shuttle)
    {
        //
    }
}
