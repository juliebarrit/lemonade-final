<?php
namespace App\Http\Controllers;

use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['customer', 'products'])->get();
        return response()->json($orders);
    }
}
