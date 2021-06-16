<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Restaurant;
use App\Food;
use App\ResType;

class RestaurantController extends Controller
{
    public function allRest()
    {
        $restaurants = Restaurant::all();
        
        // get every single restaurant
        foreach ($restaurants as $restaurant) {
            // create a support array
            $types_array = [];
            foreach ($restaurant->restaurant_types as $restaurant_type) {
                // push all the type's ids into the support array
                array_push($types_array, $restaurant_type->id);
            }
            // isert the support array into the restaurant obj
            unset($restaurant->restaurant_types);
            $restaurant['types'] = $types_array;
        }

        
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
