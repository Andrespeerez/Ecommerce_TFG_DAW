<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = ['name', 'active'];

    protected $cast = [
        'active' => 'boolean',
    ];

    public function products() {
        return $this->hasMany(Product::class);
    }
}
