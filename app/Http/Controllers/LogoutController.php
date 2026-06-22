<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LogoutController extends Controller
{
    public function store(Request $request) {

        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        

        return Inertia::location(route('login'));
    }
}