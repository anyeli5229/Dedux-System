<?php

namespace App\View\Components;

use App\Models\Transaction;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class TransactionDropdown extends Component
{
    public ?Transaction $transaction;

    public function __construct(?Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.transaction-dropdown');
    }
}
