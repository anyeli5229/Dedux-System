<?php

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Kernel::class);
$kernel->bootstrap();

$exists = Schema::hasTable('cache');
echo 'cache table exists: '.($exists ? 'YES' : 'NO').PHP_EOL;

if ($exists) {
    $cols = DB::select("SELECT column_name, is_nullable, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = 'cache' ORDER BY ordinal_position");
    print_r($cols);
}
