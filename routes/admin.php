<?php


use App\Http\Controllers\Admin\DestinationController;
use App\Http\Controllers\Admin\ShuttleController;
use App\Http\Controllers\Admin\TicketController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:admin'])->as("admin.")->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');


    Route::resource('destinations', DestinationController::class)->names([
        'index' => 'destinations',
        'create' => 'destinations.create',
        'store' => 'destinations.store',
        'show' => 'destinations.show',
        'edit' => 'destinations.edit',
        'update' => 'destinations.update',
        'destroy' => 'destinations.destroy',
    ]);

    Route::resource('shuttles', ShuttleController::class)->names([
        'index' => 'shuttles',
        'create' => 'shuttles.create',
        'store' => 'shuttles.store',
        'show' => 'shuttles.show',
        'edit' => 'shuttles.edit',
        'update' => 'shuttles.update',
        'destroy' => 'shuttles.destroy',
    ]);

    Route::resource('tickets', TicketController::class)->names([
        'index' => 'tickets',
        'create' => 'tickets.create',
        'store' => 'tickets.store',
        'show' => 'tickets.show',
        'edit' => 'tickets.edit',
        'update' => 'tickets.update',
        'destroy' => 'tickets.destroy',
    ]);
});
