<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('Api')->group(function(){
    Route::get('/restaurants', 'RestaurantController@allRest');
    Route::get('/restaurant/{slug}', 'RestaurantController@getSingleRestaurant');
    Route::get('/restaurants/{restaurant}', 'RestaurantController@getFood');
    Route::get('/types', 'RestaurantController@getTypes');
    Route::post('/payment/process', 'PaymentsController@make')->name('payment.process');
});