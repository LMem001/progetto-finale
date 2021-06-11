<?php

use Illuminate\Database\Seeder;
use App\Restaurant;
use App\Food;

class FoodsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rests = Restaurant::all();
        $food_name = ["Arancine", "Pasta con le sarde", "Abbacchio", "Arrosticini"];

        foreach($rests as $rest){
            for($i = 0; $i < count($food_name); $i++) {
                $newFood = new Food();
                $newFood->restaurant_id = $rest->id;
                $newFood->name = $food_name[$i];
                $newFood->food_price = "10";
                $newFood->save();
            }
        }
    }
}
