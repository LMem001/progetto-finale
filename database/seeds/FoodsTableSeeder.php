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
                $newFood->food_price = rand(0, 1000) / 10;
                
                if ($i > 1 ){
                    $newFood -> tagCourse = 'primo'; 
                }
                else{
                    $newFood -> tagCourse = 'secondo'; 
                }

                $newFood->allergens = 'glutine, crostacei';
                if ($i > 1 ){
                    
                    if ($i % 2 == 0) {
                        $newFood -> veggie = 1;                      
                        $newFood -> spicy = 1;
                    }
                    else{
                        $newFood -> vegan = 1;                      
                        $newFood -> glutenfree = 1;
                    }

                }
                $newFood->save();
            }
        }
    }
}
