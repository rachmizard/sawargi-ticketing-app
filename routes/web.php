<?php

use App\Http\Controllers\Guest\BookingController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

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




Route::middleware(['role:user'])->group(function () {

    Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

    Route::resource('/booking', BookingController::class)->names([
        'index' => 'booking.index',
        'book' => 'booking.create',
        'store' => 'booking.store',
        'show' => 'booking.show',
        'edit' => 'booking.edit',
        'update' => 'booking.update',
        'destroy' => 'booking.destroy',
    ]);
});

require __DIR__ . '/auth.php';
