<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order_products', function (Blueprint $table) {
            // Drop the existing foreign key for orderID if it exists
            $table->dropForeign(['orderID']);

            // Re-add the foreign key with the correct reference
            $table->foreign('orderID')
                ->references('orderID') // Ensure this references the correct primary key in the orders table
                ->on('orders')
                ->onDelete('cascade'); // Cascade delete related rows when an order is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_products', function (Blueprint $table) {
            // Drop the foreign key added in the up() method
            $table->dropForeign(['orderID']);
        });
    }
};
