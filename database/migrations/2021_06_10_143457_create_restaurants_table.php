<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('rest_name', 100);
            $table->string('open_time', 15);
            $table->string('close_time', 15);
            $table->string('img_cover')->nullable();
            $table->string('img_profile')->nullable();
            $table->string('slug', 100)->unique();
            $table->string('rest_email', 100)->unique();
            $table->string('phone', 20)->unique();
            $table->string('address', 100);
            $table->string('rest_facebook')->nullable();
            $table->string('rest_instagram')->nullable();
            $table->string('rest_tripadvisor')->nullable();
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
        Schema::dropIfExists('restaurants');
    }
}
