<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Restaurant;
use App\Food;
use Illuminate\Support\Facades\Auth;

class RestaurantController extends Controller
{
    public function allRest()
    {
        $restaurants = Restaurant::all();

        
        return response()->json($restaurants);
    }

    public function getFood(Restaurant $restaurant)
    {
        $food = Food::where('restaurant_id', $restaurant->id)->get();

        return response()->json($food);
    }

}
