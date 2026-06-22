<?php

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertSoftDeleted;
use function Pest\Laravel\delete;

uses(RefreshDatabase::class);

it('allows the owner to delete a transaction', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create();

    $response = actingAs($user)->delete(route('transactions.destroy', $transaction));

    $response->assertRedirect(route('dashboard'));
    $response->assertSessionHas('success', 'Transacción eliminada correctamente.');
    assertSoftDeleted('transactions', [
        'id' => $transaction->id
    ]);
});

it('does not allow guests to delete transactions', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($user)->create();

    $response = delete(route('transactions.destroy', $transaction));
    $response->assertRedirect(route('login'));
    assertDatabaseHas('transactions', [
        'id' => $transaction->id
    ]);
});

it('does not allow unverified users to delete transactions', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    $transaction = Transaction::factory()->for($user)->create();
    $response = actingAs($user)->delete(route('transactions.destroy', $transaction));
    $response->assertRedirect(route('verification.notice'));
    assertDatabaseHas('transactions', [
        'id' => $transaction->id
    ]);
});

it('does not allow other users to delete transactions', function () {
    $owner = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $otherUser = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $transaction = Transaction::factory()->for($owner)->create([
        'description' => 'Transacción Original'
    ]);
    $response = actingAs($otherUser)->delete(route('transactions.destroy', $transaction));

    $response->assertForbidden();
    $response->assertStatus(403);
    $response->assertSee('No tienes los permisos para realizar esta acción');
    assertDatabaseHas('transactions', [
        'id' => $transaction->id,
        'description' => 'Transacción Original'
    ]);
});
