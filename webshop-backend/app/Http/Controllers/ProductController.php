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
            Log::info('Attempting to create product:', $request->all());
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'nullable|string|max:255',
                'price' => 'required|integer',
                'color' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('images', 'public');
            }

            $product = Product::create($validated);

            return response()->json($product, 201);
        } catch (\Exception $e) {
            Log::error('Error saving product:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to save product. ' . $e->getMessage()], 500); // Server Error
        }
    }

    public function index()
    {
        try {
            Log::info('Fetching all products'); // Debugging log
            $products = Product::all()->map(function ($product) {
                $product->type = $product->type ?? 'Unknown';
                $product->color = $product->color ?? 'Not specified';
                $product->image = $product->image ? asset('storage/' . $product->image) : null;
                return $product;
            });

            return response()->json($products, 200);
        } catch (\Exception $e) {
            Log::error('Error fetching products:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch products. ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            Log::info('Updating product:', ['id' => $id, 'data' => $request->all()]);
            \Log::info('Request data:', $request->all());

            \Log::info('Request has name: ' . $request->has('name'));
            \Log::info('Request name value: ' . $request->input('name'));

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'nullable|string|max:255',
                'price' => 'required|numeric',
                'color' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            $product = Product::where('productID', $id)->firstOrFail();

            $updateData = [];


            foreach (['name', 'type', 'price', 'color', 'description'] as $field) {
                if ($request->has($field)) {
                    $updateData[$field] = $request->input($field);
                }
            }


            if ($request->hasFile('image')) {
                $updateData['image'] = $request->file('image')->store('images', 'public');
            }

            // Log the update data
            Log::info('Update data:', $updateData);


            $product->update($updateData);

            return response()->json($product, 200); // OK
        } catch (\Exception $e) {
            Log::error('Error updating product:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to update product. ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Log::info('Attempting to soft delete product:', ['id' => $id]);

            $product = Product::where('productID', $id)->firstOrFail();
            $product->delete();

            return response()->json(['message' => 'Produkt er blevet arkiveret.'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting product:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Kunne ikke arkivere produktet. ' . $e->getMessage()
            ], 500); // Server Error
        }
    }


    public function indexWithTrashed()
    {
        try {
            $products = Product::withTrashed()->get();
            return response()->json($products, 200); 
        } catch (\Exception $e) {
            return response()->json(['message' => 'Kunne ikke hente produkter'], 500); // Server Error
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
            Log::info('Fetching products by type:', ['type' => $type]);

            $products = Product::where('type', $type)->get()->map(function ($product) {
                $product->type = $product->type ?? 'Unknown';
                $product->color = $product->color ?? 'Not specified';
                $product->image = $product->image ? asset('storage/' . $product->image) : null;
                return $product;
            });

            return response()->json($products, 200); // OK
        } catch (\Exception $e) {
            Log::error('Error fetching products by type:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch products. ' . $e->getMessage()], 500); // Server Error
        }
    }

    public function show($id)
    {
        try {
            Log::info('Fetching single product:', ['id' => $id]);

            $product = Product::where('productID', $id)->first();

            if (!$product) {
                Log::error('Product not found:', ['id' => $id]);
                return response()->json(['message' => 'Product not found'], 404); // Not Found
            }

            // Format the product data
            $product->image = $product->image ? asset('storage/' . $product->image) : null;
            $product->type = $product->type ?? 'Unknown';
            $product->color = $product->color ?? 'Not specified';

            Log::info('Product found:', $product->toArray());
            return response()->json($product, 200); // OK

        } catch (\Exception $e) {
            Log::error('Error fetching product:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to fetch product'], 500); // Server Error
        }
    }
}
