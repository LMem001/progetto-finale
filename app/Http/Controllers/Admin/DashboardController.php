<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Restaurant;

class DashboardController extends Controller
{
    public function index()
    {
        $user_id = Auth::id();
        $restaurant = Restaurant::where('user_id', $user_id)->first();

        return view('admin.dashboard', compact('restaurant'));
    }
}
