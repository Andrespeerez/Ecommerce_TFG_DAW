<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class that represents a User Role.
 * 
 * e.g. Customer, Administrator
 */
class Role extends Model
{
    protected $fillable = ['name', 'description', 'is_admin', 'active'];

    protected $casts = [
        'is_admin' => 'boolean',
        'active' => 'boolean',
    ];

    /**
     * Return the collection of users that has this role assigned
     * @return HasMany<User, Role>
     */
    public function users() : HasMany {
        return $this->hasMany(User::class);
    }
}
