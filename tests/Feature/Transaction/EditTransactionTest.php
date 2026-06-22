<?php

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

uses(RefreshDatabase::class);

it('allows the owner to view the edit transaction form', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create([
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => 85.00,
        "tax" => 13.60,
        "total_amount" => 98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    //actingAs usa un user autenticado
    $response = actingAs($user)->get(route('transactions.edit', $transaction));
    $response->assertOk();
    $response->assertSee('Pago mensual de suscripción AWS - Servidores de producción');
});

it('does not allow guests to view the edit transaction form', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    //Pero for($user) sólo agrega la relación del campo id pero no autentica(inicia sesión)
    $transaction = Transaction::factory()->for($user)->create();
    $response = get(route('transactions.edit', $transaction));
    $response->assertRedirect(route('login'));
});

it('does not allow other users to view the edit transaction form', function () {
    $owner = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($owner)->create();

    $response = actingAs($otherUser)->get(route('transactions.edit', $transaction));
    $response->assertForbidden();//Código 403
    $response->assertStatus(403);
    $response->assertSee('No tienes los permisos para realizar esta acción');
});
