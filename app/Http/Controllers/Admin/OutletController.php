<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Requests\Admin\Outlet\StoreOutletRequest;
use App\Http\Requests\Admin\Outlet\UpdateOutletRequest;

use App\Services\Admin\OutletService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, OutletService $outlet)
    {
        return Inertia::render('Admin/Outlet', [
            'outlets' => $outlet->all($request),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Outlet/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\Admin\Outlet\StoreOutletRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOutletRequest $request, OutletService $outlet)
    {
        $outlet->create($request->validated());

        return redirect()->route('admin.outlets')->with('success', 'Outlet created successfully!');
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @param  \App\Services\Admin\OutletService  $outlet
     * @return \Illuminate\Http\Response
     */
    public function show($id, OutletService $outlet)
    {
        return Inertia::render('Admin/Outlet/Edit', [
            'outlet' => $outlet->find($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string  $outlet
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\Admin\Outlet\UpdateOutletRequest;  $request
     * @param  string  $id
     * @param  \App\Services\Admin\OutletService  $outlet
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOutletRequest $request, $id, OutletService $outlet)
    {
        $outlet->update($request->validated(), $id);
        return redirect()->route('admin.outlets')->with('success', 'Outlet updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @param  \App\Services\Admin\OutletService  $outlet
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, OutletService $outlet)
    {
        $outlet->delete($id);
        return redirect()->route('admin.outlets')->with('success', 'Outlet deleted successfully!');
    }
}
