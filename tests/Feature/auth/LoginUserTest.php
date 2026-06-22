<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertAuthenticated;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\from;

uses(RefreshDatabase::class);

it('shows the login screen', function () {
    $response = get(route('login'));
    $response->assertOk();
});

it('logs in a verified user successfully', function () {
    User::factory()->create([
        'email' => "test@test.com",
        'password' => bcrypt('password'),
        'email_verified_at' => now()
    ]);

    $response = post(route('login.store'), [
        'email' => "test@test.com",
        'password' => 'password',
    ]);

    $response->assertRedirect('dashboard');
    assertAuthenticated();
});

it('does not log in with invalid credentials', function () {
    User::factory()->create([
        'email' => "test@test.com",
        'password' => bcrypt('password')
    ]);

    $response = from(route('login'))->post(route('login.store'), [//De el formulario de login a enviar el formulario a login.store
        'email' => "test@test.com",
        'password' => 'incorrect-password',
    ]);

    $response->assertRedirect(route('login'));
    $response->assertSessionHas('error', 'Las credenciales que ingresaste son incorrectas');

    assertGuest();
});

it('prevents unverified user from accessing dashboard', function() {
        User::factory()->unverified()->create([
        'email' => "test@test.com",
        'password' => bcrypt('password')
    ]);

    $response = post(route('login.store'), [
        'email' => "test@test.com",
        'password' => 'password',
    ]);

    $response->assertRedirect('dashboard');
    assertAuthenticated();//Verifica el usuario haya logrado autenticarse con éxito, pero como no se encuentra verificado, lo redirecciona

    $dashboardResponse = get(route('dashboard'));//Simula el acceso al dashboard
    $dashboardResponse->assertRedirect(route('verification.notice'));//Simula la redirección por no estar verificado
});

it('does not allow access to dashboard if email is not verified', function() {
    $user = User::factory()->unverified()->create([
        'email_verified_at' => null
    ]);

    $response = actingAs($user)->get(route('dashboard'));
    $response->assertRedirect(route('verification.notice'));
});

it('allow access to dashboard if email is verified', function() {
    $user = User::factory()->unverified()->create([
        'email_verified_at' => now()
    ]);

    $response = actingAs($user)->get(route('dashboard'));
    $response->assertOk();
});

it('fails login if user does not exists', function() {
    $response = from(route('login'))->post(route('login.store'), [
        'email' => 'email@fake.com',
        'password' => 'password'
    ]);
    $response->assertRedirect(route('login'));
    $response->assertSessionHasErrors([
        'email' => 'No hay una cuenta relacionada con el email que ingresaste.'
    ]);
    assertGuest();//Sigue sin estar autenticado
});