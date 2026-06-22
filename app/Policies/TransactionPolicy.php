<?php

namespace App\Policies;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TransactionPolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Transaction $transaction): Response
    {
        return $user->id === $transaction->user_id ? Response::allow() : Response::deny('No tienes los permisos para realizar esta acción');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Transaction $transaction): Response
    {
        return $user->id === $transaction->user_id ? Response::allow() : Response::deny('No tienes los permisos para realizar esta acción');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Transaction $transaction): Response
    {
       return $user->id === $transaction->user_id ? Response::allow() : Response::deny('No tienes los permisos para realizar esta acción');
    }
}
