<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear existing products
        Product::truncate();

        // Add some default products
        $products = [
            [
                'name' => 'Pink Friday',
                'description' => 'Beautiful pink earrings for special occasions',
                'price' => 36,
                'color' => 'Pink',
                'type' => 'Øreringe',
                'image' => 'images/default-pink-earrings.webp'
            ],
            [
                'name' => 'Blue Monday',
                'description' => 'Elegant blue necklace',
                'price' => 45,
                'color' => 'Blue',
                'type' => 'Halskæde',
                'image' => 'images/default-blue-necklace.webp'
            ],
            // Add more products as needed
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
