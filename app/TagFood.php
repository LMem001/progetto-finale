<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TagFood extends Model
{
    protected $guarded = [
        'id'
    ];

    public function foods()
    {
        return $this->belongsToMany('App\Food');
    }
}
