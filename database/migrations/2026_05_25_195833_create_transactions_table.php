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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Tipo de transacción: 'income' (Ingreso) o 'expense' (Gasto)
            $table->enum('type', ['income', 'expense'])->default('expense');

            // Descripción del movimiento (ej: "Gasolina", "Pago de factura mensual")
            $table->string('description');

            // Montos desglosados para la IA y los impuestos (10 dígitos en total, 2 decimales)
            $table->decimal('subtotal', 10, 2)->default(0.00);
            $table->decimal('tax', 10, 2)->default(0.00); // El IVA u otros impuestos calculados
            $table->decimal('total_amount', 10, 2); // Lo que realmente costó o ingresó

            // Fecha en la que ocurrió la transacción
            $table->date('transaction_date');

            // Ruta de la foto del ticket o PDF(IA)
            $table->string('attachment_path')->nullable();

            // Categorías opcionales útiles para reportes o gráficas del Dashboard
            $table->string('category')->nullable(); // Ej: "Transporte", "Software", "Servicios"
            
            $table->softDeletes();//Eliminado lógico
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
