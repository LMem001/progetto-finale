<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Braintree\Gateway as Gateway;
use App\Order;
use App\Food;
use App\Restaurant;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected $validation = [
        'client_name' => 'required|string',
        'client_lastname' => 'required|string',
        'client_adress' => 'required|string',
        'client_phone' => 'required|string',
        'client_email' => 'required|string',
        'savedrestaurantId' => 'required|numeric'
    ];

    public function checkout()
    {       
        $gateway = new Gateway([
            'environment' => 'sandbox',
            'merchantId' => '35y89qdcrmqjxbm4',
            'publicKey' => 'cy7zcsmnv7shw32h',
            'privateKey' => 'b3532888dc5b7a9627e8904228ed3ba0'
        ]);

        $token = $gateway->ClientToken()->generate();

        return view('guest.payment', compact('token'));
    }

    public function make(Request $request)
    {   
        $gateway = new Gateway([
            'environment' => 'sandbox',
            'merchantId' => '35y89qdcrmqjxbm4',
            'publicKey' => 'cy7zcsmnv7shw32h',
            'privateKey' => 'b3532888dc5b7a9627e8904228ed3ba0'
        ]);
        $total = floatval($request->total);

        $result = $gateway->transaction()->sale([
            'amount' => $total,
            'paymentMethodNonce' => $request->payment_method_nonce,
            'options' => [
                'submitForSettlement' => True
                ]
        ]);

        $food_array = explode("/,",$request->ordered_food);

        $timezone = date('Y-m-d H:i:s');
        dd($timezone);

        $newOrder = new Order();
        $newOrder -> restaurant_ID =  $request->restaurant_ID;
        $newOrder -> pickup_date = $timezone;
        $newOrder -> status = $result->success;
        $newOrder -> payment_type = 'credit card';
        $newOrder -> total_order = $total;
        $newOrder->save();

        return redirect()->route('successpayment');
    }

}

