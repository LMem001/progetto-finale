<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Restaurant extends Model
{
    protected $guarded = [
        'id', 'restaurant_type'
    ];
    public function restaurant_types()
    {
        return $this->belongsToMany('App\ResType', 'res_type_restaurant', 'restaurant_id', 'res_type_id');
    }
    public function foods()
    {
        return $this->hasMany('App\Food');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}

