<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Cashier::keepPastDueSubscriptionsActive();//Manitiene la subscripci;on activa en lo que se realiza el swap
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
