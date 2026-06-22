<?php

namespace App\Http\Controllers;

use App\Ai\Agents\TicketScanner;
use App\CategoryType;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // manejo de archivos
use Laravel\Ai\Files;

class TicketScanController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'document' => 'required|file|mimes:jpeg,png,jpg,webp,pdf,xml|max:10240', // max 10MB
        ]);

        set_time_limit(120);

        $uploadedFile = $request->file('document');

        try {
            $response = (new TicketScanner())->prompt(
                'Lee el documento y extrae la información',
                attachments: [Files\Document::fromUpload($uploadedFile)],
                provider: 'gemini',
                model: 'gemini-2.5-flash',
                timeout: 120
            );
        } catch (\Exception $e) {
            // Si la IA truena por API Key, red, o configuración
            return response()->json([
                'success' => false,
                'message' => 'Error interno en el módulo de IA: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString() // para ver error
            ], 400); // código 400 
        }

        // Si la IA respondió pero vino vacía
        if (empty($response)) {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo extraer la información del documento (Respuesta vacía)'
            ]);
        }

        // Una vez procesado, se guarda el archivo físicamente
        $filePath = $uploadedFile->store('attachments', 'public');

        $cleanText = trim($response->text);
        $aiData = json_decode($cleanText, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            preg_match('/\{.*?\}/s', $cleanText, $matches);
            if (!empty($matches[0])) {
                $aiData = json_decode($matches[0], true);
            }
        }

        if (empty($aiData)) {
            Storage::disk('public')->delete($filePath);

            return response()->json([
                'success' => false,
                'message' => 'Error de decodificación JSON en la respuesta de la IA',
                'raw_text' => $response->text
            ]);
        }

        return response()->json($this->createTransactionFromAi($user, $aiData, $filePath));
    }

    /**
     * Procesa la respuesta estructurada de la IA y crea la transacción en la base de datos.
     */
    private function createTransactionFromAi(User $user, array $data, string $filePath): array
    {
        $transaction = Transaction::create([
            'user_id'             => $user->id,
            'provider_name'       => $data['store'] ?? $data['provider_name'] ?? 'Proveedor Desconocido',
            'provider_legal_name' => $data['provider_name'] ?? null,
            'provider_tax_id'     => $data['provider_tax_id'] ?? null,
            'type'                => $data['type'] ?? 'expense',
            'transaction_date'    => $data['transaction_date'],
            'total_amount'        => $data['total_amount'],
            'tax'                 => $data['tax'] ?? 0.00,
            'subtotal'            => $data['subtotal'] ?? $data['total_amount'],
            'currency'            => $data['currency'] ?? 'MXN',
            'category'            => $data['category'] ?? CategoryType::Otros->value,
            'description'         => $data['description'] ?? 'Gasto escaneado mediante IA',
            'attachment_path'     => $filePath,
            'status'              => 'pending_review',
        ]);

        $user->increment('scanned_tickets_count', 1);

        return [
            'success' => true,
            'message' => "Documento procesado. Transacción creada en estado pendiente.",
            'data'    => $transaction,
            'redirect_url' => "/dashboard/transactions/{$transaction->id}" //Sirve para redireccionar al usuario cuando la ia termine de examinar el documento
        ];
    }
}
