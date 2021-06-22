<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
    return view('guest.index');
})->name('home');

Auth::routes();

Route::get('/restaurant/show/{id}', function () {
    return view('guest.show');
})->name('restaurantShow');



Route::prefix('admin')->name('admin.')->namespace('Admin')->group(function() {
    Route::resource('restaurant', 'RestaurantController');
    Route::resource('food', 'FoodController');

    Route::get('dashboard', 'DashboardController@index')->name('dashboard.index');
});

Route::get('/info', function () {
    return view('guest.info');
});

Route::get('/payment', function () {
    return view('welcome');
});
