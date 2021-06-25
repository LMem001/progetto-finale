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

Route::get('/successpayment', function() {
    return view('guest.successpayment');
})->name('successpayment');

Route::prefix('admin')->name('admin.')->namespace('Admin')->group(function() {
    Route::resource('restaurant', 'RestaurantController');
    Route::resource('food', 'FoodController');
    Route::post('payorder', 'OrderController@make')->name("makepayment");
    Route::get('pay', 'OrderController@checkout')->name("payment");
    Route::get('dashboard', 'DashboardController@index')->name('dashboard.index');
    Route::get('dashboard/{order}', 'DashboardController@show')->name('dashboard.show');
});

Route::get('/info', function () {
    return view('guest.info');
})->name("chiSiamo");

// Route::get('/payment', function () {
//     return view('welcome');
// })->name('payment');

Route::get('/payment/success', function () {
    $gateway = new \Braintree\Gateway([
        'environment' => 'sandbox',
        'merchantId' => '35y89qdcrmqjxbm4',
        'publicKey' => 'cy7zcsmnv7shw32h',
        'privateKey' => 'b3532888dc5b7a9627e8904228ed3ba0'
    ]);

    $clientToken = $gateway->clientToken()->generate();

    return view('payed', compact('clientToken'));
});