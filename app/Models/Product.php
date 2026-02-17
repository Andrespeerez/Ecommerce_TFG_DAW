<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price_without_iva',
        'iva_percentage',
        'price_with_iva',
        'stock',
        'image_url',
        'category_id',
        'material_id',
        'finish_id',
        'width_cm',
        'height_cm',
        'depth_cm',
        'active',
    ];

    protected $casts = [
        'price_without_iva' => 'decimal:2',
        'iva_percentage' => 'integer',
        'price_with_iva' => 'decimal:2',
        'stock' => 'integer',
        'width_cm' => 'decimal:2',
        'height_cm' => 'decimal:2',
        'depth_cm' => 'decimal:2',
        'active' => 'boolean',
    ];

    /**
     * Return the category assigned to this product
     * @return BelongsTo<Category, Product>
     */
    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }

    /**
     * Return the material assigned to this product
     * @return BelongsTo<Material, Product>
     */
    public function material(): BelongsTo {
        return $this->belongsTo(Material::class);
    }

    /**
     * Return the finish assigned to this product
     * @return BelongsTo<Finish, Product>
     */
    public function finish(): BelongsTo {
        return $this->belongsTo(Finish::class);
    }
}
