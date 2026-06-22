<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionRequest;
use App\Models\Transaction;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Inertia\Inertia;

class TransactionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // 🌟 Iniciamos el query base de transacciones del usuario
        $tableQuery = $user->transactions();

        // Sigue teniendo soporte para filtros si el usuario les da clic en las tarjetas de arriba
        if ($request->filled('status')) {
            $tableQuery->where('status', $request->query('status'));
        } elseif ($request->filled('type')) {
            $tableQuery->where('type', $request->query('type'));
        }

        return Inertia::render('Transactions/Dashboard', [
            // 🌟 Ahora por defecto trae TODO (verified y pending_review combinados por fecha)
            'transactions'   => $tableQuery->latest('transaction_date')->get(),

            // Las gráficas y los totales SÍ se quedan fijos solo con las verificadas
            // para que las pendientes no alteren sus balances reales antes de tiempo.
            'totalIncome'    => (string) $user->transactions()->where('type', 'income')->where('status', 'verified')->sum('total_amount'),
            'totalExpense'   => (string) $user->transactions()->where('type', 'expense')->where('status', 'verified')->sum('total_amount'),
            'pendingIaCount' => (string) $user->transactions()->where('status', 'pending_review')->count('id'),
            'chartData'      => $user->transactions()->where('type', 'expense')->where('status', 'verified')->selectRaw('category, SUM(total_amount) as total')->groupBy('category')->pluck('total', 'category')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Transactions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        $data = $request->validated();

        $request->user()->transactions()->create($data);

        return redirect()->route('dashboard')->with('success', 'Transacción creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    #[Authorize('view', 'transaction')]
    public function show(Transaction $transaction)
    {
        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    #[Authorize('update', 'transaction')]
    public function edit(Transaction $transaction)
    {
        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    #[Authorize('update', 'transaction')]
    public function update(TransactionRequest $request, Transaction $transaction)
    {
        $transaction->update($request->validated());

        return redirect()->route('transactions.show', $transaction->id)
            ->with('success', 'Datos corregidos con éxito. Por favor, verifica y aprueba la transacción.');
    }

    /**
     * Remove the specified resource from storage.
     */
    #[Authorize('delete', 'transaction')]
    public function destroy(Transaction $transaction)
    {
        $transaction->delete($transaction->id);

        return redirect()->route('dashboard')->with('success', 'Transacción eliminada correctamente.');
    }

    public function approve(Transaction $transaction)
    {
        $transaction->update([
            'status' => 'verified'
        ]);

        return redirect()->route('dashboard')->with('success', '¡Transacción aprobada con éxito!');
    }
}
