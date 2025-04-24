<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('orderID');
            $table->integer('product_amount');
            $table->integer('totalPrice');
            $table->foreignId('customerID')->constrained('customers')->onDelete('cascade');
            $table->string('shipping_address');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
