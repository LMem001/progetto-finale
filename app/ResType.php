<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ResType extends Model
{
    protected $guarded = ['id'];
    
    public function restaurants()
    {
        return $this->belongsToMany('App\Restaurant');
    }
}
