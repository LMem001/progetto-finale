<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Restaurant;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        $users = User::all();
        foreach($users as $user){
            $newRestaurant = new Restaurant();
            $newRestaurant->user_id = $user->id;
            $newRestaurant->rest_name = $faker->firstname();
            $newRestaurant->open_time = '10:00';
            $newRestaurant->close_time = '24:00';
            $newRestaurant->phone = $faker->phoneNumber();
            $newRestaurant->img_cover = $faker->imageUrl(640, 480, 'animals', true);
            $newRestaurant->img_profile = $faker->imageUrl(640, 480, 'animals', true);
            $newRestaurant->slug = Str::slug($newRestaurant->rest_name, '-');
            $newRestaurant->rest_email = $faker->email();
            $newRestaurant->address = $faker->address();
            $newRestaurant->save();
        }
    }
}
