<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

//use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function index() {
        return Inertia::render('Auth/Register');
    }

    public function store(SignupRequest $request) {

        $data = $request->validated();

        //Se registra el usuario en la base de datos
        $user = User::create($data);

        //Se genera un evento de registro con el usuario como valor de instancia en modelo de User
        event(new Registered($user));

        //Se inicia sesión para obtener su cookie y confirmar la cuenta en la url de verification.verify
        Auth::login($user);

        return redirect()->route('verification.notice');
    }
}
