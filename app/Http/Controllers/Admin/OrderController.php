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
        $total = floatval($request->total_order);

        $result = $gateway->transaction()->sale([
            'amount' => $total,
            'paymentMethodNonce' => $request->payment_method_nonce,
            'options' => [
                'submitForSettlement' => True
                ]
        ]);

        $food_array = explode("/,",$request->ordered_food);

        $timezone = date('Y-m-d'). ' ' .$request->pickup_date;

        $newOrder = new Order();
        $newOrder -> restaurant_ID =  $request->restaurant_ID;
        $newOrder -> pickup_date = $timezone;
        $newOrder -> status = $result->success;
        $newOrder -> payment_type = 'credit card';
        $newOrder -> total_order = $total;
        $newOrder->save();

        foreach ($food_array as $value) {
            $value =  explode(",",$value);
            if ($value[1] > 1){
                for ($i = 0; $i < $value[1]; $i++){
                    $newOrder ->foods()->attach($value[0]);
                }
            }
            else{
                $newOrder ->foods()->attach($value[0]);
            }
        }

        return redirect()->route('successpayment');
    }

}

