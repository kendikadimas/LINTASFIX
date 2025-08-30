<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Http\Request;
use Illuminate\Routing\Route;

$request = Request::create('/items/1', 'GET');
$routes = $app['router']->getRoutes();
try {
    $route = $routes->match($request);
    $action = $route->getActionName();
    $middleware = $route->gatherMiddleware();
    echo "Matched action: {$action}\n";
    echo "Middleware: " . json_encode($middleware) . "\n";
    echo "URI: {$route->uri}\n";
} catch (Exception $e) {
    echo "No route matched: " . $e->getMessage() . PHP_EOL;
}
