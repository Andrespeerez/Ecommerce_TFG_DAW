<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * This class represents the Product Material
 */
class Material extends Model
{
    protected $fillable = ['name', 'active'];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Return the collection of products that has this material assigned
     * @return HasMany<Product, Material>
     */
    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }
}
