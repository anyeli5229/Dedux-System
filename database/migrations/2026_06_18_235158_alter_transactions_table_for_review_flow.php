<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            if (Schema::hasColumn('transactions', 'ai_ocr_metadata')) {
                $table->dropColumn('ai_ocr_metadata');
            }

            if (Schema::hasColumn('transactions', 'status')) {
                $table->string('status')->default('pending_review')->change();
            }
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            if (!Schema::hasColumn('transactions', 'ai_ocr_metadata')) {
                $table->json('ai_ocr_metadata')->nullable();
            }

            if (Schema::hasColumn('transactions', 'status')) {
                $table->string('status')->default('verified')->change();
            }
        });
    }
};