<?php

use Illuminate\Database\Seeder;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for($i = 0; $i < 3; $i++) {
            $newUser = new User();
            $newUser->name = $faker->firstname();
            $newUser->lastname = $faker->lastname();
            $newUser->email = $faker->unique()->email();
            $newUser->phone = $faker->unique()->phoneNumber();
            $newUser->vat = $faker->unique()->creditCardNumber();
            $newUser->billing_address = $faker->address();
            $newUser->iban = $faker->unique()->iban();
            $newUser->password = "12345678";
            $newUser->save();
        }
    }
}
