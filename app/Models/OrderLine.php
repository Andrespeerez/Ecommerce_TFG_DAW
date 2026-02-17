<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderLine extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price_without_iva',
        'iva_percentage',
        'subtotal_without_iva',
        'subtotal_iva',
        'subtotal_with_iva',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price_without_iva' => 'decimal:2',
        'iva_percentage' => 'integer',
        'subtotal_without_iva' => 'decimal:2',
        'subtotal_iva' => 'decimal:2',
        'subtotal_with_iva' => 'decimal:2',
    ];

    /**
     * Return the Order this OrderLine belongs to
     * @return BelongsTo<Order, OrderLine>
     */
    public function order():BelongsTo {
        return $this->belongsTo(Order::class);
    }

    /**
     * Return the Product this OrderLine belongs to
     * @return BelongsTo<Product, OrderLine>
     */
    public function product():BelongsTo {
        return $this->belongsTo(Product::class);
    }

}
