<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['customer', 'products'])->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            Log::info('Creating order with data', ['data' => $request->all()]); // Fixed logging

            $validated = $request->validate([
                'customerID' => 'required|exists:customers,customerID',
                'products' => 'required|array',
                'products.*.productID' => 'required|integer|exists:products,productID',
                'products.*.quantity' => 'required|integer|min:1',
                'products.*.price' => 'required|numeric|min:0',
                'products.*.total_price' => 'required|numeric|min:0'
            ]);

            $totalAmount = collect($validated['products'])->sum('total_price');

            // Create order
            $order = Order::create([
                'customerID' => $validated['customerID'],
                'total_amount' => $totalAmount,
                'status' => 'pending'
            ]);

            Log::info('Order created', ['orderID' => $order->orderID]); // Fixed logging

            // Create order products
            foreach ($validated['products'] as $product) {
                OrderProduct::create([
                    'orderID' => $order->orderID,
                    'productID' => $product['productID'],
                    'quantity' => $product['quantity'],
                    'total_price' => $product['total_price']
                ]);
            }

            DB::commit();

            Log::info('Order completed with products', [
                'orderID' => $order->orderID,
                'products' => array_values($validated['products'])
            ]);

            return response()->json($order, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create order', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Failed to create order: ' . $e->getMessage()
            ], 500);
        }
    }
}
