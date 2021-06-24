<?php

use Illuminate\Database\Seeder;
use App\Restaurant;
use App\Food;
use App\Order;
use Faker\Generator as Faker;



class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $newOrder = new Order();
        $newOrder -> restaurant_ID = 1;
        $newOrder -> pickup_date = $faker->dateTime();
        $newOrder -> status = 0;
        $newOrder -> payment_type = 'credit card';
        $newOrder -> total_order = 10;
        $newOrder->save();

        $counter = 5;

        $foods = Food::where('restaurant_id', 1)->get();

        while ($counter != 0){
            $newOrder ->foods()->attach(rand( 1,  count($foods)));
            $counter--;
        }
    }
}
