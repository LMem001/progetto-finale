<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Restaurant;
use App\ResType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    protected $validation = [
        'rest_name' => 'required|string|unique:restaurants',
        'open_time' => 'required|string',
        'close_time' => 'required|string',
        'rest_email' => 'required|string|unique:restaurants',
        'phone' => 'required|string|unique:restaurants',
        'address' => 'required|string',
        'img_cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'img_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
    ];
    
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

        if(Auth::id() == null){
            return redirect()->route('login')->with('message', 'Effettua il Login per visualizzare la pagina');
        }

        //slug
        $data['slug'] = Str::slug($data['rest_name'], '-');

        // passare immagine
        if(isset($data['img_cover'])){
            $data['img_cover'] = Storage::disk('public')->put('images', $data['img_cover']);
        }

        if(isset($data['img_profile'])){
            $data['img_profile'] = Storage::disk('public')->put('images', $data['img_profile']);
        }

        //inserisco dati in db
        $newRestaurant = Restaurant::create($data); 

        //"collego" i tag
        if(count($data['types']) > 0){
            $newRestaurant ->restaurant_types()->attach($data['types']);
        }
        
        return redirect()->route('admin.dashboard.index');
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
