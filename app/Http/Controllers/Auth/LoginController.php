<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignInRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index() {
        return Inertia::render('Auth/Login');
    }

    public function store(SignInRequest $request) {
        
        $data = $request->validated();

        if(!Auth::attempt($data)) {
            return back()->with('error', 'Las credenciales que ingresaste son incorrectas');
        }

        return redirect()->route('dashboard');
    }
}
