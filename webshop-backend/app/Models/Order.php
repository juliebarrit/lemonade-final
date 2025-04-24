<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'orderID';

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customerID');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products', 'orderID', 'productID')
                    ->withPivot('quantity', 'total_price');
    }
}
