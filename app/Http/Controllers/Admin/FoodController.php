<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Restaurant;
use App\User;
use App\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FoodController extends Controller
{
    protected $validation = [
        'name' => 'required|string',
        'food_price' => 'required|numeric',
        'tagCourse' => 'required|string',
        'allergens' => 'required|string'
    ];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get the user's restaurant
        $user_id = Auth::id();
        $restaurant = Restaurant::where('user_id', $user_id)->first();

        // get the food of the user's restaurant 
        $food = Food::where('restaurant_id', $restaurant->id)->get();

        return view('admin.food.index', compact('food'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.food.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Food $food)
    {
        $validation = $this->validation;

        $request->validate($this->validation);

        $data = $request->all();

        $user_id = Auth::id();

        $restaurant = Restaurant::where('user_id', $user_id)->first();

        $data['restaurant_id'] = $restaurant->id;

        //inserisco dati in db
        $newFood = Food::create($data);
        
        return redirect()->route('admin.food.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
