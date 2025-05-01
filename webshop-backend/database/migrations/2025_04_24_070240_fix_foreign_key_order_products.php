<?php
// filepath: c:\Users\julie\webshop-project\webshop-backend\database\migrations\<timestamp>_fix_foreign_key_order_products.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('order_products', function (Blueprint $table) {
            // Drop existing foreign keys if they exist
            $table->dropForeign(['orderID']);
            $table->dropForeign(['productID']);

            // Add the foreign keys with correct references
            $table->foreign('orderID')
                  ->references('orderID')
                  ->on('orders')
                  ->onDelete('cascade');

            $table->foreign('productID')
                  ->references('productID')
                  ->on('products')
                  ->onDelete('restrict');
        });
    }

    public function down()
    {
        Schema::table('order_products', function (Blueprint $table) {
            $table->dropForeign(['orderID']);
            $table->dropForeign(['productID']);
        });
    }
};
