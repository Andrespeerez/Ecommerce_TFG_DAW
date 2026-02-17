<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class that represents a Product Finish
 */
class Finish extends Model
{
    protected $fillable = ['name', 'active'];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Return the collection of products that has this finish assigned
     * @return HasMany<Product, Finish>
     */
    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }
}
