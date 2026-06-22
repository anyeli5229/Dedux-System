<?php

namespace App\View\Components;

use App\Models\Transaction;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class TransactionForm extends Component
{

    public ?Transaction $transaction;

    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }


    public function render(): View|Closure|string
    {
        return view('components.transaction-form');
    }
}
