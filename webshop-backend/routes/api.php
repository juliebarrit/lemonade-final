<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Kunde ruter
Route::apiResource('customers', CustomerController::class);

// Ordre ruter
Route::apiResource('orders', OrderController::class);

// Produkt ruter
Route::apiResource('products', ProductController::class);
Route::get('products/type/{type}', [ProductController::class, 'getByType']);
