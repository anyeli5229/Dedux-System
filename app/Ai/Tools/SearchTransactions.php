<?php

namespace App\Ai\Tools;

use App\Models\Transaction;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Illuminate\Support\Facades\Auth;
use Stringable;

class SearchTransactions implements Tool
{
    public function description(): Stringable|string
    {
        return 'Busca transacciones en la base de datos. Permite filtrar por nombre/descripción, categoría, tipo (income/expense).';
    }

    public function handle(Request $request): Stringable|string
    {
        $userId = Auth::id();
        if (!$userId) {
            return 'Error: No se pudo identificar al usuario autenticado.';
        }

        $query = Transaction::query()->where('user_id', $userId);

        // Volvemos a tu sintaxis original de array que sí funcionaba
        if (!empty($request['description'])) {
            $query->where('description', 'ilike', '%' . $request['description'] . '%');
        }

        if (!empty($request['category'])) {
            $query->where('category', 'ilike', '%' . $request['category'] . '%');
        }

        if (!empty($request['type'])) {
            $query->where('type', $request['type']);
        }

        $transactions = $query->orderBy('transaction_date', 'desc')->limit(20)->get();

        if ($transactions->isEmpty()) {
            return 'No encontré ninguna transacción registrada con esos criterios.';
        }

        $total = $transactions->sum('total_amount');

        return "Transacciones encontradas:\n" .
            $transactions->map(function ($transaction) {
                // Evitamos el error si la categoría viene nula o es un String/Enum
                $cat = 'others';
                if ($transaction->category) {
                    $cat = method_exists($transaction->category, 'label') 
                        ? $transaction->category->label() 
                        : (string) $transaction->category;
                }
                return "- {$transaction->description}: \${$transaction->total_amount} ({$cat})";
            })->implode("\n") .
            "\n\nTotal: \${$total}";
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'description' => $schema->string()->description('Palabra o concepto a buscar en la descripción'),
            'category' => $schema->string()->description('Categoría (ej: meals, services, transport)'),
            'type' => $schema->string()->enum(['income', 'expense'])->description('Filtrar por ingreso o gasto'),
        ];
    }
}