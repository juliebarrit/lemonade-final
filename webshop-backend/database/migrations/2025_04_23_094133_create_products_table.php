<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('productID');
            $table->string('name');
            $table->string('type');
            $table->integer('price');
            $table->string('color')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable(); // Ensure 'image' is nullable
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
