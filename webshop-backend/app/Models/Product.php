<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'productID'; // Ensure this matches the primary key in the database
    protected $fillable = ['name', 'type', 'price', 'color', 'description', 'image'];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_products', 'productID', 'orderID')
                    ->withPivot('quantity', 'total_price');
    }
}
