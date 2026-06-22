<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class ResetPasswordController extends Controller
{
    public function index(string $token, Request $request) {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email
        ]);
    }

    public function store(ResetPasswordRequest $request) {
        $data = $request->validated();
        $status = Password::reset(
            $data,//Credenciales
            function($user, $password){//callback si todo sale bien
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if($status === Password::PASSWORD_RESET) {
            return redirect()
                ->route('login')
                ->with('success', 'La contraseña se actualizó correctamente. Ya puedes iniciar sesión');
        }

        return back()->with([
            'error' => 'El enlace no es válido o ha expirado. Solicita uno nuevo'
        ]);
    }
}
