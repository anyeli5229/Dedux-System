<?php

namespace App\Models;

use App\CategoryType;
use App\TransactionType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'user_id',
    'type',
    'description',
    'currency',
    'subtotal',
    'tax',
    'total_amount',
    'transaction_date',
    'attachment_path',
    'category',
    'provider_name',
    'provider_tax_id',
    'status',
    'ai_ocr_metadata'
])]
class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isIncome(): bool
    {
        return $this->type === TransactionType::Ingreso;
    }

    public function isExpense(): bool
    {
        return $this->type === TransactionType::Gasto;
    }

    protected $casts = [
        'type' => TransactionType::class,
        'category' => CategoryType::class,
        'transaction_date' => 'date',
        'ai_ocr_metadata' => 'array', //Convierte  el JSON de la BD en un Array de PHP y viceversa
    ];
}
