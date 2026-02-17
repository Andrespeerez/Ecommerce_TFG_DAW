<?php

namespace App\Models;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class that represents an Order
 */
class Order extends Model
{
    protected $fillable = [
        'order_number',
        'user_id',
        'order_date',
        'subtotal_without_iva',
        'iva',
        'total_price',
        'status',
        'shipping_address',
        'shipping_city',
        'shipping_province',
        'shipping_postal_code',
    ];

    protected $casts = [
        'order_date' => 'date',
        'subtotal_without_iva' => 'decimal:2',
        'iva' => 'decimal:2',
        'total_price' => 'decimal:2',
        'status' => OrderStatus::class,
    ];

    /**
     * Return the user that this order belongs to
     * @return BelongsTo<User, Order>
     */
    public function user():BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * Return a collection of OrderLine that belongs to Order
     * @return HasMany<OrderLine, Order>
     */
    public function orderLines(): HasMany {
        return $this->hasMany(OrderLine::class);
    }
}
