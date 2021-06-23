<?php

namespace App;

use App\Restaurant;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [
        'id'
    ];

    public function restaurant(){
        return $this->belongsTo('App\Restaurant');
    }

}
