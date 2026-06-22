<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Override;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    #[Override]
    public function messages() : array
    {
        return [
            "name.required" => "El nombre es obligatorio",
            "email.required" => "El email es obligatorio",
            "email.email" => "Agrega un email válido",
            "email.unique" => "El email que ingresaste ya se encuentra registrado",
            "password.required" => "La contraseña es obligatoria",
            "password.confirmed" => "Las contraseñas no son las mismas",
            "password.min" => "La contraseña debe de tener al menos :min caracteres",
            "password.letters" => "La contraseña debe de tener al menos 1 letra",
            "password.mixed" => "La contraseña debe de tener al menos 1 letra mayúscula y 1 letra minúscula",
            "password.symbols" => "La contraseña debe de tener al menos 1 caracter especial (@_.*)",
            "password.numbers" => "La contraseña debe de tener al menos 1 número",
            "password.uncompromised" => "La contraseña ha parecido en filtraciones de datos. Elige un más segura",
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "string"],
            "email" => ["required", "email", "unique:users,email"], //unique en la tabla de usuarios en campo de email
            "password" => ["required", "confirmed",
                Password::min(8)
                    // ->letters()
                    // ->mixedCase()
                    // ->symbols()
                    // ->numbers()
                    // ->uncompromised()
            ]
        ];
    }
}
