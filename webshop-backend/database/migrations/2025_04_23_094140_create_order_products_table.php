<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('orderID');
            $table->unsignedBigInteger('productID');
            $table->integer('quantity');
            $table->decimal('total_price', 10, 2);
            $table->timestamps();

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
        Schema::dropIfExists('order_products');
    }
};
