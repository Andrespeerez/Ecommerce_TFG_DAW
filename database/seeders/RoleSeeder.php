<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'admin',
            'description' => 'Administrador del sitio',
            'is_admin' => true,
            'active' => true,
        ]);

        Role::create([
            'name' => 'customer',
            'description' => 'Cliente del sitio',
            'is_admin' => false,
            'active' => true,
        ]);
    }
}
