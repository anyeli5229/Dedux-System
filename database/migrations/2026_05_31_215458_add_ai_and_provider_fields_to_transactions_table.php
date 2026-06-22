<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Datos del Emisor/Proveedor (Se guardan directo para facilitar el flujo con la IA)
            $table->string('provider_name')->nullable()->after('description');
            $table->string('provider_tax_id')->nullable()->after('provider_name'); // RFC, NIT, NIF, etc.

            // Moneda de la transacción (Por defecto la de tu país local, ej: MXN, COP, USD)
            $table->string('currency', 3)->default('MXN')->after('total_amount');

            // Flujo de revisión: 'verified' para el CRUD manual, 'pending_review' para lo que cree la IA
            $table->enum('status', ['pending_review', 'verified'])
                  ->default('verified')
                  ->after('category');
                  
            // Espacio flexible para guardar folios, números de factura o datos extra del OCR
            $table->json('ai_ocr_metadata')->nullable()->after('status'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn([
                'provider_name',
                'provider_tax_id',
                'currency',
                'status',
                'ai_ocr_metadata'
            ]);
        });
    }
};