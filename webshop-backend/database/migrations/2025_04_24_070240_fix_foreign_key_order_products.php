<?php
// filepath: c:\Users\julie\webshop-project\webshop-backend\database\migrations\<timestamp>_fix_foreign_key_order_products.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixForeignKeyOrderProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_products', function (Blueprint $table) {
            // Drop the existing foreign key if it exists
            $table->dropForeign(['productID']);

            // Re-add the foreign key with the correct reference
            $table->foreign('productID')
                ->references('id') // Ensure this references the correct primary key in the products table
                ->on('products')
                ->onDelete('cascade'); // Cascade delete related rows when a product is deleted
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_products', function (Blueprint $table) {
            // Drop the foreign key added in the up() method
            $table->dropForeign(['productID']);
        });
    }
}