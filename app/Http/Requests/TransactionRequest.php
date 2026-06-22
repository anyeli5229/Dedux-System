<?php

namespace App\Http\Requests;

use App\CategoryType;
use App\TransactionType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class TransactionRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'description' => ['required', 'string', 'max:255'],
            'type' => ['required', new Enum(TransactionType::class)],
            'category' => ['required', new Enum(CategoryType::class)],
            'currency' => ['nullable', 'string', 'in:MXN,USD,COP,EUR'],
            'subtotal' => ['nullable', 'numeric', 'min:0'],
            'tax' => ['nullable', 'numeric', 'min:0'],
            'total_amount' => ['required', 'numeric', 'min:0.01'], // El total sí debe ser mayor a cero
            'transaction_date' => ['required', 'date', 'before_or_equal:today'], // Evita que pongan fechas del futuro
            'provider_name'    => ['nullable', 'string', 'max:255'],
            'provider_tax_id'  => ['nullable', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'description.required' => 'La descripción de la transacción es obligatoria.',
            'description.max' => 'La descripción no puede tener más de 255 caracteres.',

            'type.required' => 'El tipo de transacción es obligatorio.',
            'type.in' => 'El tipo de transacción seleccionado no es válido.',

            'category.required' => 'Debes seleccionar una categoría para clasificar este movimiento.',

            'currency.in' => 'La moneda seleccionada actualmente no está soportada por el sistema.',

            'subtotal.numeric' => 'El subtotal debe ser un número válido.',
            'subtotal.min' => 'El subtotal no puede ser un número negativo.',

            'tax.numeric' => 'El valor del impuesto debe ser un número válido.',
            'tax.min' => 'El impuesto no puede ser un número negativo.',

            'total_amount.required' => 'El monto total es obligatorio.',
            'total_amount.numeric' => 'El monto total debe ser un número válido.',
            'total_amount.min' => 'El monto total debe ser mayor a 0.',

            'transaction_date.required' => 'La fecha de emisión es obligatoria.',
            'transaction_date.date' => 'El formato de la fecha no es válido.',
            'transaction_date.before_or_equal' => 'La fecha de la transacción no puede ser una fecha futura.',

            'provider_name.max' => 'El nombre del proveedor no puede exceder los 255 caracteres.',
            'provider_tax_id.max' => 'La identificación fiscal no puede exceder los 50 caracteres.',
        ];
    }

    protected function passedValidation()
    {
        if (!$this->has('tax') || is_null($this->tax)) {
            $this->merge([
                'tax' => 0,
            ]);
        }
        // Si no viene subtotal, se calcula: total menos impuesto
        if (!$this->has('subtotal') || is_null($this->subtotal)) {
            $this->merge([
                'subtotal' => $this->total_amount - $this->tax,
            ]);
        }

        if (!$this->has('currency') || is_null($this->currency)) {
            $this->merge([
                'currency' => 'MXN',
            ]);
        }
    }
}
