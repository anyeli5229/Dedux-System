<?php

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

uses(RefreshDatabase::class);

it('allows the owner to update a transaction', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create([
        'description' => 'Transacción Original'
    ]);

    $response = actingAs($user)->put(route('transactions.update', $transaction), [
        'description' => 'Transacción Actualizada',
        'type' => $transaction->type->value,
        'category' => $transaction->category->value,
        'subtotal' => 100.00,
        'tax' => 16.00,
        'total_amount' => 116.00,
        'transaction_date' => now()->format('Y-m-d')
    ]);

    $response->assertRedirect(route('dashboard'));
    $response->assertSessionHas('success', 'Transacción actualizada correctamente.');

    assertDatabaseHas('transactions', [
        'id' => $transaction->id,
        'description' => 'Transacción Actualizada'
    ]);
});

it('validates required fields when updating a transaction', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create();

    $response = actingAs($user)->from(route('transactions.edit', $transaction))->put(route('transactions.update', $transaction), []);
    $response->assertRedirect(route('transactions.edit', $transaction));
    $response->assertSessionHasErrors([
        'description',
        'type',
        'category',
        'subtotal',
        'tax',
        'total_amount',
        'transaction_date'
    ]);
});

it('validates amount must be greater than zero when updating a transaction', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create();

    $response = actingAs($user)->from(route('transactions.edit', $transaction))->put(route('transactions.update', $transaction), [
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => -85.00,
        "tax" => -13.60,
        "total_amount" => -98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $response->assertRedirect(route('transactions.edit', $transaction));
    $response->assertSessionHasErrors([
        'subtotal',
        'tax',
        'total_amount',
    ]);
});

it('validates type and category must be valid when updating a transaction', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create();

    $response = actingAs($user)->from(route('transactions.edit', $transaction))->put(route('transactions.update', $transaction), [
        "type" => "not_valid",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => -85.00,
        "tax" => -13.60,
        "total_amount" => -98.60,
        "category" => "not_valid",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $response->assertRedirect(route('transactions.edit', $transaction));
    $response->assertSessionHasErrors([
        'type',
        'category'
    ]);
});

it('does not allow guests to update transactions', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create();

    $response = put(route('transactions.update', $transaction), [
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => -85.00,
        "tax" => -13.60,
        "total_amount" => -98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $response->assertRedirect(route('login'));
});

it('does not allow other users to update transactions', function () {
    $owner = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($owner)->create([
        'description' => 'Transacción Original'
    ]);
    $response = actingAs($otherUser)->put(route('transactions.update', $transaction), [
        'description' => 'hackeado',
        'type' => $transaction->type->value,
        'category' => $transaction->category->value,
        'subtotal' => 100.00,
        'tax' => 16.00,
        'total_amount' => 116.00,
        'transaction_date' => now()->format('Y-m-d')
    ]);

    $response->assertForbidden();
    $response->assertStatus(403);

    assertDatabaseHas('transactions', [
        'id' => $transaction->id,
        'description' => 'Transacción Original'
    ]);
});