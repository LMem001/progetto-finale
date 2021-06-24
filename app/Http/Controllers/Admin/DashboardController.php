<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Restaurant;
use App\Order;

class DashboardController extends Controller
{
    public function index()
    {
        $user_id = Auth::id();

        if(Auth::id() == null){
            return redirect()->route('login')->with('message', 'Effettua il Login per visualizzare la pagina');
        }

        $restaurant = Restaurant::where('user_id', $user_id)->first();

        // check user's restaurant
        if($restaurant == null) {
            return redirect()->route('admin.restaurant.create');
        }

        $orders = Order::where('restaurant_id', $restaurant->id)->get();

        return view('admin.dashboard.index', compact('restaurant', 'orders'));
    }

    public function show(Order $order)
    {
        return view('admin.dashboard.show', compact('order'));
    }
}
