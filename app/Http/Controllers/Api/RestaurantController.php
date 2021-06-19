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
        if ( $request->id == 0 ){
            $restaurants = Restaurant::take(12)->get();
            return response()->json($restaurants);
        }
        $restaurants = Restaurant::all();

        $restaurant_filtered = [];

        // get every single restaurant
        foreach ($restaurants as $key => $restaurant) {
            $check_type = 0;
            // create a support array
            foreach ($restaurant->restaurant_types as $restaurant_type) {
                if($restaurant_type->id == $request->id) {
                    $check_type = 1;
                    array_push( $restaurant_filtered, $restaurant);

                    if (count($restaurant_filtered) == 12) {
                        return response()->json($restaurant_filtered);
                    }
                }
            }
            if($check_type == 0) {
                unset($restaurants[$key]);
            }
        }
        
        return response()->json($restaurant_filtered);
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
