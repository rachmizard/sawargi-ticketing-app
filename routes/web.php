<?php

use App\Http\Controllers\Admin\DestinationController;
use App\Http\Controllers\Admin\ShuttleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix("admin")->middleware(['auth', 'verified', 'can:role:admin'])->as("admin.")->group(function () {
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
});

require __DIR__ . '/auth.php';
