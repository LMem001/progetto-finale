<?php

use App\Restaurant;
use App\ResType;
use Illuminate\Database\Seeder;


class Res_typeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = ['kebab', 'vegano', 'asiatico', 'indiano', 'pizza', 'cinese', 'panini', 'pasticceria', 'messicano', 'vegetariano', 'tradizionale' ];

        foreach($types as $type) {
            $newType = new ResType();
            $newType->restaurant_type = $type;
            $newType->save();
        }
    }
}
