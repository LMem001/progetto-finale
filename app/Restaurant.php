<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $guarded = [
        'id', 'restaurant_type'
    ];
    public function restaurant_types()
    {
        return $this->belongsToMany('App\ResType');
    }
    public function foods()
    {
        return $this->hasMany('App\Food');
    }
}

