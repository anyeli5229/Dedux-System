<?php

namespace App\Http\Controllers;

use App\Ai\Agents\TransactionsAssistant;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TransactionAiController extends Controller
{
    public function store(Request $request)
    {
        $messages = $request->input('messages', []);
        $lastMessage = collect($messages)->last();

        $promp = collect(data_get($lastMessage, 'parts', []))
            ->where('type', 'text')
            ->pluck('text')
            ->implode(' ')
            ?: data_get($lastMessage, 'content', '');

        $prompLower = mb_strtolower($promp, 'UTF-8'); //String en minúsculas
        $userId = Auth::id();

        // ---Creación de transacciones ---
        if (Str::contains($prompLower, ['agrega', 'añade', 'registra', 'crea', 'nuevo gasto', 'nuevo ingreso'])) {
            $promp = "INSTRUCCIÓN DE SISTEMA: El usuario quiere registrar una transacción. 
            Debes responder amablemente al usuario confirmando que procesarás su registro (ej. '¡Por supuesto! Estoy registrando tu pago...').
            
            **REGLA OBLIGATORIA**: Al final de tu respuesta, debes incluir un bloque con los datos extraídos envueltos EXACTAMENTE entre las etiquetas <data> y </data> en una sola línea. No inventes campos extra, en la descripción sólo añade el nombre que te prorporciona el usuario, no agregues datos extra como el folio o la fecha, si ves que en la descripción dice algún mes, asume que esa es la fecha y siempre dile al usuario los datos que asignaste.
            
            Formato al final del mensaje:
            <data>{\"action\": \"CREATE_TRANSACTION\", \"description\": \"Nombre\", \"tax\": 0.00, \"subtotal\": 0.00, \"total_amount\": 0.00, \"type\": \"expense|income\", \"currency\": \"MXN\", \"category\": \"services|meals|payroll|supplies|others\", \"provider_name\": \"Nombre del proveedor o null si no se menciona\", \"provider_tax_id\": \"Identificación fiscal/RFC o null si no se menciona\"}</data>
            
            Petición del usuario: " . $promp;
        }
        // ---Búsqueda y consultas---
        elseif (Str::contains($prompLower, ['gasto', 'ingreso', 'comida', 'total', 'dinero', 'cuanto', 'cuánto', 'movimientos', 'pendiente', 'pendientes', 'revisado', 'revisados', 'revisada', 'revisadas'])) {
            if ($userId) {
                $query = Transaction::query()->where('user_id', $userId);

                // Detectar si el usuario está pidiendo una fecha (Mes actual o anterior)
                $filtradoPorFecha = false;
                $periodoTexto = "";

                if (Str::contains($prompLower, ['este mes', 'mes actual', 'de este mes'])) {
                    $query->where('transaction_date', '>=', now()->startOfMonth()->toDateString())
                        ->where('transaction_date', '<=', now()->endOfMonth()->toDateString());
                    //WHERE transaction_date BETWEEN 'primer_dia_del_mes' AND 'ultimo_dia_del_mes'

                    $filtradoPorFecha = true;
                    $periodoTexto = "este mes";
                } elseif (Str::contains($prompLower, ['mes anterior', 'mes pasado', 'del mes pasado'])) {
                    $query->where('transaction_date', '>=', now()->subMonth()->startOfMonth()->toDateString())
                        ->where('transaction_date', '<=', now()->subMonth()->endOfMonth()->toDateString());
                    //WHERE transaction_date BETWEEN 'primer_dia_del_mes_anterior' AND 'ultimo_dia_del_mes_anterior'

                    $filtradoPorFecha = true;
                    $periodoTexto = "el mes anterior";
                }

                // Lógica de extracción por Estatus
                $filtradoPorStatus = false;
                $statusTexto = "";

                if (Str::contains($prompLower, ['pendiente', 'pendientes', 'por revisar', 'sin revisar'])) {
                    $query->where('status', 'pending_review');
                    $filtradoPorStatus = true;
                    $statusTexto = "pendientes de revisión";
                } elseif (Str::contains($prompLower, ['revisado', 'revisados', 'aprobado', 'aprobados', 'aprobada', 'aprobadas'])) {
                    $query->where('status', 'approved');
                    $filtradoPorStatus = true;
                    $statusTexto = "revisados/aprobados";
                }

                //Lógica de extracción de Proveedor (Solo si NO es una consulta de fecha)
                $providerSearch = null;
                //preg_match(patrón, texto, resultado)
                //Busca la palabra de del o provedor y deja los espacio en blanco que hay despues de esas palabaras(\s+)
                //Obtiene la palabra completa(+) case-insensitive (/i)
                if (preg_match('/(?:de|del|proveedor)\s+([a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+)/i', $promp, $matches)) {
                    //si el usuario escribe 'del proveedor Walmart', se detecta 'provedor Walmart' y se guarada en el arreglo de $matches
                    $candidate = trim($matches[1]); //Se guarda la palabra 'Walmart'

                    // Si la palabra capturada es una de estas, NO es un proveedor
                    $listaNegra = [
                        'este',
                        'ese',
                        'mes',
                        'pasado',
                        'anterior',
                        'un',
                        'una',
                        'la',
                        'el',
                        'los',
                        'cuenta',
                        'pendiente',
                        'pendientes',
                        'revisado',
                        'revisados',
                        'revisar',
                        'revisar?'
                    ];

                    if (!in_array(strtolower($candidate), $listaNegra))
                        $providerSearch = $candidate;
                }
            }

            // Aplicamos el filtro de proveedor si se encontró uno real
            if ($providerSearch) {
                $query->where(function ($q) use ($providerSearch) {
                    $q->where('provider_name', 'ILIKE', "%{$providerSearch}%")
                        ->orWhere('description', 'ILIKE', "%{$providerSearch}%");
                });
            }

            // Ejecutamos la consulta con los filtros que hayan aplicado (fechas, proveedor o ambos)
            // Se añade 'status' al get() para que la IA sepa decírselo al usuario
            $transactionsData = $query->latest()->limit(10)->get(['transaction_date', 'description', 'total_amount', 'provider_name', 'type', 'status']);

            // Mensaje de contexto inteligente para la IA
            $contexto = "CONTEXTO REAL DE LA BASE DE DATOS: El usuario está consultando transacciones. ";
            if ($filtradoPorFecha) $contexto .= "Filtrado por el periodo: {$periodoTexto}. ";
            if ($filtradoPorStatus) $contexto .= "Filtrado por el estatus: {$statusTexto}. ";
            if ($providerSearch) $contexto .= "Filtrado por el proveedor/concepto: '{$providerSearch}'. ";
            $contexto .= "Registros encontrados: " . $transactionsData->toJson();

            $promp = $contexto . "\n\nResponde de manera ejecutiva, amigable y clara listando o resumiendo estos movimientos al usuario en base a lo que pidió. Si no hay datos, infórmale amablemente. Pregunta del usuario: " . $promp;
        }

        $agent = new TransactionsAssistant();

        return $agent
            ->stream(
                $promp,
                provider: 'openrouter',
                model: 'poolside/laguna-m.1:free'
            )->usingVercelDataProtocol();

    }
}
