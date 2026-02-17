<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name', 'description', 'is_admin', 'active'];

    protected $casts = [
        'is_admin' => 'boolean',
        'active' => 'boolean',
    ];

    public function users() {
        return $this->hasMany(User::class);
    }
}
