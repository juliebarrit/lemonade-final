<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'nullable|string|max:255', // Allow nullable type
                'price' => 'required|integer',
                'color' => 'nullable|string|max:255', // Allow nullable color
                'description' => 'nullable|string',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048', // Validate file upload and allow webp
            ]);

            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('images', 'public'); // Store file in 'public/images'
            }

            $product = Product::create($validated);

            return response()->json($product, 201);
        } catch (\Exception $e) {
            \Log::error('Error saving product:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to save product. ' . $e->getMessage()], 500);
        }
    }

    public function index()
    {
        try {
            \Log::info('Fetching all products'); // Debugging log
            $products = Product::all()->map(function ($product) {
                $product->type = $product->type ?? 'Unknown'; // Default value for type
                $product->color = $product->color ?? 'Not specified'; // Default value for color
                $product->image = $product->image ? asset('storage/' . $product->image) : null; // Generate full URL for image
                return $product;
            });

            return response()->json($products);
        } catch (\Exception $e) {
            \Log::error('Error fetching products:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch products. ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            \Log::info('Updating product with ID:', ['id' => $id]);
            \Log::info('Request data:', $request->all());

            // Debug incoming data
            \Log::info('Request has name: ' . $request->has('name'));
            \Log::info('Request name value: ' . $request->input('name'));

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'nullable|string|max:255',
                'price' => 'required|numeric', // Changed to numeric to accept string numbers
                'color' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $product = Product::where('productID', $id)->firstOrFail();

            // Prepare the data for updating
            $updateData = [];

            // Copy validated text fields
            foreach (['name', 'type', 'price', 'color', 'description'] as $field) {
                if ($request->has($field)) {
                    $updateData[$field] = $request->input($field);
                }
            }

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $updateData['image'] = $request->file('image')->store('images', 'public');
            }

            // Log the update data
            \Log::info('Update data:', $updateData);

            // Update the product
            $product->update($updateData);

            return response()->json($product, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating product:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to update product. ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            \Log::info('Deleting product with ID:', ['id' => $id]); // Debugging log

            // Find and delete the product
            $product = Product::where('productID', $id)->firstOrFail();
            $product->delete();

            return response()->json(['message' => 'Product deleted successfully.'], 200);
        } catch (\Exception $e) {
            \Log::error('Error deleting product:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to delete product. ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get products by type
     *
     * @param string $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByType($type)
    {
        try {
            \Log::info('Fetching products by type:', ['type' => $type]);

            $products = Product::where('type', $type)->get()->map(function ($product) {
                $product->type = $product->type ?? 'Unknown';
                $product->color = $product->color ?? 'Not specified';
                $product->image = $product->image ? asset('storage/' . $product->image) : null;
                return $product;
            });

            return response()->json($products);
        } catch (\Exception $e) {
            \Log::error('Error fetching products by type:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch products. ' . $e->getMessage()], 500);
        }
    }
}
