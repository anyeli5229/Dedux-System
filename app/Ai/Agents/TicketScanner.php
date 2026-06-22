<?php

namespace App\Ai\Agents;

use App\CategoryType;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;

class TicketScanner implements Agent
{
    use Promptable;

    public function instructions(): string
    {

        $validCategories = collect(CategoryType::cases())->map(fn($c) => $c->value)->implode(', ');

        return <<<PROMPT
        Eres un asistente contable experto y ultra preciso para la aplicación Dedux. Tu única tarea es analizar imágenes de tickets, archivos PDF o documentos XML de gastos y extraer la información financiera e identificaciones fiscales en un formato JSON estrictamente estructurado.

        REGLAS DE EXTRACCIÓN:
        1. "store": Nombre comercial común y simplificado del negocio (ej. Walmart, Costco, Telmex, Oxxo).
        2. "provider_name": La Razón Social o nombre legal completo del proveedor. Si no está visible, devuelve null.
        3. "provider_tax_id": El identificador fiscal del proveedor (RFC, NIT, Tax ID) limpio, sin espacios ni guiones. Si no existe, devuelve null.
        4. "type": Siempre debe ser la palabra "expense".
        5. "transaction_date": La fecha real en la que se realizó la compra. Debes extraerla estrictamente en formato "YYYY-MM-DD" (Año-Mes-Día). Si el ticket no tiene año visible, asume la fecha actual.
        6. "total_amount": El monto total neto pagado final (número flotante, sin signos de pesos ni comas).
        7. "tax": El monto total de IVA (16%) pagado. Si no se desglosa o es tasa 0%, pon 0.00.
        8. "subtotal": El total menos el tax (IVA). Asegura la coherencia matemática: subtotal = total_amount - tax.
        9. "currency": El código internacional de la moneda de 3 letras (ISO 4217). Ej: "MXN", "USD", "EUR". Por defecto "MXN".
        10. "category": Clasificación exacta de la transacción. Debe ser obligatoriamente uno de estos valores (en minúsculas): [{$validCategories}].
        11. "description": Un resumen muy breve, ejecutivo y amigable de lo que se compró.

        REGLAS ESTRICTAS DE SALIDA:
        - No inventes información. Si la razón social o el identificador fiscal no están, pon null.
        - Responde ÚNICAMENTE con el objeto JSON puro, sin bloques de código de Markdown (no uses ```json).
        PROMPT;
    }

public function schema(): array
{
    $categoriesEnum = array_column(CategoryType::cases(), 'value');

    return [
        // 'type' => 'object',
        'properties' => [
            'store' => [
                'type' => 'string',
                'description' => 'Nombre comercial del negocio (si no se sabe, poner el nombre más genérico visible).'
            ],
            'provider_name' => [
                'type' => ['string', 'null'],
                'description' => 'Razón social completa. Si no está visible, poner null.'
            ],
            'provider_tax_id' => [
                'type' => ['string', 'null'],
                'description' => 'RFC/Identificación fiscal limpia. Si no está visible, poner null.'
            ],
            'type' => [
                'type' => 'string',
                'enum' => ['expense']
            ],
            'transaction_date' => [
                'type' => 'string',
                'description' => 'Fecha en formato YYYY-MM-DD.'
            ],
            'total_amount' => [
                'type' => 'number',
                'description' => 'Monto total pagado.'
            ],
            'tax' => [
                'type' => ['number', 'null'],
                'description' => 'Monto de IVA. Si no hay desglose, poner null o 0.00.'
            ],
            'subtotal' => [
                'type' => ['number', 'null'],
                'description' => 'Subtotal. Si no se puede calcular, poner null.'
            ],
            'currency' => [
                'type' => 'string',
                'enum' => ['MXN', 'USD', 'EUR', 'COP'],
                'description' => 'Código de moneda. Por defecto MXN.'
            ],
            'category' => [
                'type' => ['string', 'null'],
                'enum' => array_merge($categoriesEnum, [null]), // Permitimos que el enum acepte null
                'description' => 'Categoría exacta. Si es imposible clasificar por falta de datos, poner null.'
            ],
            'description' => [
                'type' => ['string', 'null'],
                'description' => 'Resumen corto de la compra.'
            ]
        ],
        //campos indispensables para la base de datos de Dedux
        'required' => [
            'store', 
            'type', 
            'transaction_date', 
            'total_amount', 
            'currency', 
            'category'
        ],
        'additionalProperties' => false
    ];
}
}