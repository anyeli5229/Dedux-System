<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\SubscriptionCheckoutController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TicketScanController;
use App\Http\Controllers\TransactionAiController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UpdatePasswordController;
use App\Http\Controllers\UpdateProfileController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Home');
});

Route::get('/features', function () {
    return Inertia::render('Auth/Features');
});

Route::get('/pricing', function () {
    return Inertia::render('Auth/Pricing');
});

Route::middleware('guest')->group(function () {
    Route::get('/auth/register', [RegisterController::class, 'index'])->name('register');
    Route::post('/auth/register', [RegisterController::class, 'store'])->name('register.store');

    Route::get('/auth/login', [LoginController::class, 'index'])->name('login');
    Route::post('/auth/login', [LoginController::class, 'store'])->name('login.store');
});

Route::post('/auth/logout', [LogoutController::class, 'store'])->middleware('auth')->name('logout.store');

Route::get('/auth/forgot-password', [ForgotPasswordController::class, 'index'])->name('password.request');
Route::post('/auth/forgot-password', [ForgotPasswordController::class, 'store'])->name('password.email');

Route::get('/auth/reset-password/{token}', [ResetPasswordController::class, 'index'])->name('password.reset');
Route::post('/auth/reset-password', [ResetPasswordController::class, 'store'])->name('password.update');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect()->route('dashboard')->with('success', '¡Cuenta verificada correctamente! Bienvenido a Dedux. Ya puedes comenzar a controlar tus gastos y automatizar tus facturas.');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::post('/email/verification-notificaction', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('success', '¡Se ha enviado el correo de verificación nuevamente!');
})->middleware(['auth', 'throttle:1,1'])->name('verification.send');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {


    Route::get('/', [TransactionController::class, 'index'])->name('dashboard');
    Route::get('/transactions/create', [TransactionController::class, 'create'])->name('transactions.create');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
    Route::get('/transactions/{transaction}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');
    Route::put('/transactions/{transaction}', [TransactionController::class, 'update'])->name('transactions.update');
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])->name('transactions.destroy');


    Route::get('/settings/profile', [UpdateProfileController::class, 'edit'])->name('settings.profile');
    Route::put('/settings/profile', [UpdateProfileController::class, 'update'])->name('settings.profile.update');
    Route::get('/settings/password', [UpdatePasswordController::class, 'edit'])->name('settings.password');
    Route::put('/settings/password', [UpdatePasswordController::class, 'update'])->name('settings.password.update');
});


//Rutas de ia
Route::middleware(['auth', 'verified'])->group(function () {
    //Aprobar las transacciones
    Route::patch('/transactions/{transaction}/approve', [TransactionController::class, 'approve'])
        ->name('transactions.approve');

    Route::post('/transactions/chat', [TransactionAiController::class, 'store'])
        ->name('transactions.chat');

    Route::post('/transactions/scan-ticket', [TicketScanController::class, 'store'])
        ->name('transactions.scan-ticket')->middleware('check.feature.limit');
});

Route::middleware(['auth', 'verified'])->group(function () {
    //PAGOS
    Route::post('/subscription-checkout/{plan}', [SubscriptionCheckoutController::class, 'store'])->name('subscription.checkout')->whereIn('plan', ['monthly', 'yearly']);

    Route::inertia('/billing/success', 'Billing/Success')->name('billing.success');

    Route::get('/billing/cancel/{plan?}', function (string $plan = 'monthly') {
        return Inertia::render('Billing/Cancel', [
            'plan' => $plan
        ]);
    })->name('billing.cancel');

    Route::get('/plans', function () {
        return Inertia::render('Pro/Plans');
    })->name('plans');

    //Subscripciones
    Route::get('/subscription', [SubscriptionController::class, 'show'])
        ->name('subscription.manage');

    Route::post('/subscription/swap/{plan}', [SubscriptionController::class, 'swap'])
        ->name('subscription.swap')
        ->whereIn('plan', ['monthly', 'yearly']);

    Route::post('/subscription/cancel', [SubscriptionController::class, 'cancel'])
        ->name('subscription.cancel');

    Route::post('/subscription/resume', [SubscriptionController::class, 'resume'])
        ->name('subscription.resume');

    Route::get('/billing', function (Request $request) {
        return $request->user()->redirectToBillingPortal(route('dashboard'));
    })->name('billing'); //Lo lleva al panel de stripe
});

Route::fallback(function () {
    abort(404);
});
