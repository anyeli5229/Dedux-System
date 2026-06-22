<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // El nombre legal de la persona o empresa (ej: "Juan Pérez" o "Duka Tech S.A.")
            $table->string('tax_name')->nullable()->after('email');
            // Su identificador fiscal único (RFC, NIT, NIF, etc.)
            $table->string('tax_id')->nullable()->after('tax_name');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['tax_name', 'tax_id']);
        });
    }
};