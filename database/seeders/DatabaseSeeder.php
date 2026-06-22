<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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
        DB::statement('ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT \'main\';');

        DB::table('subscriptions')->updateOrInsert(
            [
                'user_id' => $user->id,
            ],
            [
                'name' => 'default',
                'type' => 'default',
                'stripe_id' => 'sub_demo_123456789',
                'stripe_status' => 'active',
                'stripe_price' => 'price_1TlCeUCj1bk7BciWjC2LZk5h',
                'quantity' => 1,
                'trial_ends_at' => null,
                'ends_at' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
