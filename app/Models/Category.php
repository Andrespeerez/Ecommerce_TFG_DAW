<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class that represents the Category of a Product
 * 
 * e.g. Chair, Table
 */
class Category extends Model
{
    protected $fillable = ['name', 'active'];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Return the collection of products that has this category assigned
     * @return HasMany<Product, Category>
     */
    public function products() : HasMany {
        return $this->hasMany(Product::class);
    }
}
