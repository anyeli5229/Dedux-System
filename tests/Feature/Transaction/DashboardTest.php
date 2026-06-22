<?php

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;


uses(RefreshDatabase::class);

it('shows empty state when the user has no transactions', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->get(route('dashboard'));
    $response->assertOk();
    $response->assertSee('No hay registros aún');
    $response->assertSee('Comienza registrando una transacción manual o subiendo tu factura XML para que nuestra IA la procese.');
});

it('only shows the authenticated user transactions', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now()
    ]);

    Transaction::factory()->for($user)->create([
        'description' => 'Comida de negocios'
    ]);

    Transaction::factory()->for($otherUser)->create([
        'description' => 'Otro gasto'
    ]);

    $response = actingAs($user)->get(route('dashboard'));
    $response->assertOk();
    $response->assertSee('Comida de negocios');
    $response->assertDontSee('Otro gasto');
});
