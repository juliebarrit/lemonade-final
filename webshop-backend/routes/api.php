<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Order routes
Route::get('/orders', [OrderController::class, 'index']); // Fetch orders

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::post('/products/{id}', [ProductController::class, 'update']); // Keep this for form submissions
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Add a route to filter products by type if needed in the future
Route::get('/products/type/{type}', [ProductController::class, 'getByType']);

Route::get('/debug', function () {
    return response()->json(['message' => 'API routes are working']);
});

Route::get('/routes', function () {
    $routes = [];
    foreach (Route::getRoutes() as $route) {
        $routes[] = [
            'methods' => $route->methods(),
            'uri' => $route->uri(),
            'name' => $route->getName(),
            'action' => $route->getActionName(),
        ];
    }
    return response()->json($routes);
});
