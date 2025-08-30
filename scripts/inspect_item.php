<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
try {
    $item = \App\Models\Item::find(1);
    if (! $item) {
        echo "notfound\n";
        exit(0);
    }
    var_export([
        'id' => $item->id,
        'name' => $item->name,
        'is_active' => (int) $item->is_active,
        'status' => $item->status,
        'slug' => $item->slug,
    ]);
    echo PHP_EOL;
} catch (Throwable $e) {
    echo 'error: ' . $e->getMessage() . PHP_EOL;
}
