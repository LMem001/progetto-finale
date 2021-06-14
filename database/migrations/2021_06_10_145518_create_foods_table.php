<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            $table->string('name', 50);
            $table->float('food_price', 5, 2);
            $table->string('tagCourse', 25);
            $table->string('allergens')->nullable();
            $table->boolean('veggie')->default(0);
            $table->boolean('vegan')->default(0);
            $table->boolean('spicy')->default(0);
            $table->boolean('glutenfree')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foods');
    }
}
