<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'demo@dedux.com'],
            [
                'name' => 'Reclutador Demo',
                'password' => Hash::make('DeduxDemo2026'),
                'email_verified_at' => now(),
            ]
        );

        $user->subscriptions()->updateOrCreate(
            ['name' => 'default'],
            [
                'stripe_id' => 'sub_demo_123456789',
                'stripe_status' => 'active', 
                'stripe_price' => 'price_1TlCeUCj1bk7BciWjC2LZk5h',
                'quantity' => 1,
                'trial_ends_at' => null,
                'ends_at' => null,
            ]
        );
    }
}
