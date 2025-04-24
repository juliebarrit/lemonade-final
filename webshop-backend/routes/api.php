<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;

Route::get('/orders', [OrderController::class, 'index']); // Fetch orders
Route::post('/products', [ProductController::class, 'store']); // Create a new product
Route::get('/products', [ProductController::class, 'index']); // Fetch all products
Route::put('/products/{id}', [ProductController::class, 'update']); // Update a product by ID
Route::post('/products/{id}', [ProductController::class, 'update']); // Support POST with _method=PUT
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete a product by ID

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