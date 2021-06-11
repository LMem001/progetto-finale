<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = "foods";
    protected $guarded = [
        'id'
    ];
    public function restaurant()
    {
        return $this->belongsTo('App\Restaurant');
    }
    public function orders()
    {
        return $this->belongsToMany('App\Order');
    }
    public function tagfoods()
    {
        return $this->belongsToMany('App\TagFood');
    }
}
