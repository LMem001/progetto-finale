<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Restaurant;
use App\Food;
use App\ResType;

class RestaurantController extends Controller
{
    public function allRest(Request $request)
    {
        $restaurants = Restaurant::all();
        $give_data = [];
        
        // get every single restaurant
        foreach ($restaurants as $restaurant) {
            // create a support array
            $types_array = [];
            foreach ($restaurant->restaurant_types as $restaurant_type) {
            }
        }
        $restaurant = $restaurant::where('restaurant_types', 'like', '$request->id');
        
        return response()->json($restaurants);
    }

    public function getFood(Restaurant $restaurant)
    {
        $food = Food::where('restaurant_id', $restaurant->id)->get();

        return response()->json($food);
    }

    public function getTypes()
    {
        $types = ResType::all();

        return response()->json($types);
    }
}
