<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    public function make(Request $request)
    {
        $gateway = new \Braintree\Gateway([
            'environment' => 'sandbox',
            'merchantId' => '35y89qdcrmqjxbm4',
            'publicKey' => 'cy7zcsmnv7shw32h',
            'privateKey' => 'b3532888dc5b7a9627e8904228ed3ba0'
        ]);

        $result = $gateway->transaction()->sale([
            'amount' => $request->input('amount'),
            'paymentMethodNonce' => $request->input('paymentMethodNonce'),
            'options' => [
                'submitForSettlement' => True
                ]
            ]);
    
            return response()->json($result);
    }
}