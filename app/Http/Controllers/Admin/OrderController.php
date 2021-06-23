<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function makePayment(Request $request)
    {
        dd($request);
        $gateway = new Gateway([
            'environment' => 'sandbox',
            'merchantId' => '35y89qdcrmqjxbm4',
            'publicKey' => 'cy7zcsmnv7shw32h',
            'privateKey' => 'b3532888dc5b7a9627e8904228ed3ba0'
        ]);

        $clientToken = $gateway->clientToken()->generate();

        $result = $gateway->transaction()->sale([
            'amount' => $request->input('amount'),
            'paymentMethodNonce' => $request->input('paymentMethodNonce'),
            'options' => [
                'submitForSettlement' => True
                ]
            ]);
    
            return redirect()->route('successpayment');
    }

    public function storeOrder()
    {
        return view('guest.successpayment');
    }

}
