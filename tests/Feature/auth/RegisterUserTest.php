<?php

use App\Models\User;
use App\Notifications\VerifyEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;

use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it('shows the registration screen', function () {
    $response = get(route('register'));
    $response->assertOk();

    $response->assertStatus(200);
    $response->assertSee('Crear Cuenta');
    $response->assertSee('Registrarme');

    $response->assertSeeInOrder([
        'Crear Cuenta',
        'Registrarme'
    ]);
});

it('register a new user as inverified and dispatches the registered event', function () {
    Event::fake();

    $response = post(route('register.store'), [
        'name' => 'user test',
        'email' => "test@test.com",
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect(route('verification.notice'));

    $user = User::query()->where('email', 'test@test.com')->first();

    expect($user)->not->toBeNull();

    expect($user->name)->toBe('user test');
    expect($user->email)->toBe('test@test.com');
    expect($user->hasVerifiedEmail())->toBeFalse();

    Event::assertDispatched(Registered::class);
});

it('should validate required fields when the request body is empty', function () {
    $response = post(route('register.store'), []);

    $response->assertSessionHasErrors([
        'name',
        'email',
        'password'
    ]);

    $response->assertSessionHasErrors([
        'name' => 'El nombre es obligatorio',
        'email' => 'El email es obligatorio',
        'password' => 'La contraseña es obligatoria',
    ]);
});


it('prevents duplicate email addresses', function () {
    User::factory()->create([
        'email' => "test@test.com"
    ]);

    $response = post(route('register.store'), [
        'name' => 'user test',
        'email' => "test@test.com",
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect();

    $response->assertSessionHasErrors([
        'email' => 'El email que ingresaste ya se encuentra registrado',
    ]);
});

it('sends the verification email notificaction after registration', function () {
    Notification::fake();

    $response = post(route('register.store'), [
        'name' => 'user test',
        'email' => "test@test.com",
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $user = User::query()->where('email', 'test@test.com')->first();

    Notification::assertSentTo($user, VerifyEmail::class);
});

it('verifies the user email from signed verification email', function () {
    $user = User::factory()->unverified()->create();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        [
            'id' => $user->id,
            'hash' => sha1($user->email),
        ]
    );

    $response = actingAs($user)->get($verificationUrl);
    $response->assertRedirect(route('dashboard'));
    expect($user->refresh()->hasVerifiedEmail())->toBeTrue();
});

it('does not allow an unverified user to access the dashboard', function () {
    $user = User::factory()->unverified()->create();

    $response = actingAs($user)->get(route('dashboard'));
    $response->assertRedirect(route('verification.notice'));
});

it('allows a verified user to access the dashboard', function () {
    $user = User::factory()->unverified()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->get(route('dashboard'));
    $response->assertOk();
});