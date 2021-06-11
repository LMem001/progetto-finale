<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Restaurant;
use App\ResType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class RestaurantController extends Controller
{
    protected $validation = [
        'rest_name' => 'required|string',
        'open_time' => 'required|string',
        'close_time' => 'required|string',
        'rest_email' => 'required|string',
        'phone' => 'required|string',
        'address' => 'required|string'
    ];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $types = ResType::all();

        return view('admin.restaurant.create', compact('types'));    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Restaurant $restaurant, Request $request)
    {
        $validation = $this->validation;

        $request->validate($this->validation);

        $data = $request->all();

        $data['user_id'] = Auth::id();

        //slug
        $data['slug'] = Str::slug($data['rest_name'], '-');

        //passare immagine
        // if(isset($data['image'])){
        //     $data['image'] = Storage::disk('public')->put('images', $data['image']);
        // }

        //inserisco dati in db
        $newRestaurant = Restaurant::create($data); 

        //"collego" i tag
        if(isset($data['$types'])){
            $newRestaurant ->restaurant_types()->attach($data['types']);
        }
        
        return redirect()->route('admin.restaurant.create');
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
