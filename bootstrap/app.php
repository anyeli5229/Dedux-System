<?php

use App\Http\Middleware\CheckFeatureUsage;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\Subscribed;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
        $middleware->preventRequestForgery(except: [
            'stripe/*'
        ]);
        $middleware->alias([
            'subscribed' => Subscribed::class,
            'check.feature.limit' => CheckFeatureUsage::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response) {
            // Si la respuesta es un error 404 (o 500, 403, etc.)
            if (in_array($response->getStatusCode(), [404, 500, 403])) {
                return Inertia::render('Errors/ErrorPage', [
                    'status' => $response->getStatusCode()
                ])
                    ->toResponse(request())
                    ->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();
