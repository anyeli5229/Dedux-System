<?php

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

uses(RefreshDatabase::class);

it('validates required fields when creating transaction', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->from(route('transactions.create'))->post(route('transactions.store'), []);
    $response->assertRedirect(route('transactions.create'));
    $response->assertSessionHasErrors([
        'type',
        'description',
        'subtotal',
        'tax',
        'total_amount',
        'transaction_date',
        'category',
    ]);
});

it('does not allow guest to create transaction', function () {
    $response = post(route('transactions.store'), []);
    $response->assertRedirect(route('login'));
});

it('asigns the created transaction to the athenticated user', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    actingAs($user)->post(route('transactions.store'), [
        "user_id" => 89,
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => 85.00,
        "tax" => 13.60,
        "total_amount" => 98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $transaction = Transaction::query()->first();

    // Valida que sí exista en la base de datos
    expect($transaction)->not->toBeNull();

    expect($transaction->user_id)->toBe($user->id);
});


it('creates a new transaction and redirects with a succcess message', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->post(route('transactions.store'), [
        "user_id" => 89,
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => 85.00,
        "tax" => 13.60,
        "total_amount" => 98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $response->assertRedirect(route('dashboard'));
    $response->assertSessionHas('success', 'Transacción creada correctamente.');
});

it('does not allow unverified users to create transactions', function () {
    $user = User::factory()->create([
        'email_verified_at' => null
    ]);

    $response = actingAs($user)->post(route('transactions.store'), [
        "user_id" => 89,
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => 85.00,
        "tax" => 13.60,
        "total_amount" => 98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $response->assertRedirect(route('verification.notice'));
});

it('validates subtotal, tax, total_amount must be greater than zero', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->from(route('transactions.create'))->post(route('transactions.store'), [
        "user_id" => 89,
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => -85.00,
        "tax" => -13.60,
        "total_amount" => -98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);
    $response->assertRedirect(route('transactions.create'));
    $response->assertSessionHasErrors([
        'subtotal',
        'tax',
        'total_amount',
    ]);
});

it('validate type and category must be valid', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->from(route('transactions.create'))->post(route('transactions.store'), [
        "user_id" => 89,
        "type" => "not_valid",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => 85.00,
        "tax" => 13.60,
        "total_amount" => 98.60,
        "category" => "not_valid",
        "transaction_date" => now()->format('Y-m-d')
    ]);
    $response->assertRedirect(route('transactions.create'));
    $response->assertSessionHasErrors([
        'type',
        'category'
    ]);
});

it('acceot valid types and categories', function () {
    $user = User::factory()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->from(route('transactions.create'))->post(route('transactions.store'), [
        "user_id" => 89,
        "type" => "expense",
        "description" => "Pago mensual de suscripción AWS - Servidores de producción",
        "subtotal" => 85.00,
        "tax" => 13.60,
        "total_amount" => 98.60,
        "category" => "meals",
        "transaction_date" => now()->format('Y-m-d')
    ]);

    $response->assertSessionDoesntHaveErrors();
    assertDatabaseHas('transactions', ['type' => 'expense', 'category' => 'meals']);
});
