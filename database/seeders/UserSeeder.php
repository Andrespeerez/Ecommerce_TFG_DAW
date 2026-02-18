<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email' => 'admin@barberes.com',
            'password' => 'admin',
            'full_name' => 'Administrador del Sitio',
            'phone' => '',
            'address' => '',
            'city' => '',
            'province' => '',
            'postal_code' => '',
            'role_id' => 1,
            'active' => true,
        ]);

        User::create([
            'email' => 'cliente@gmail.com',
            'password' => '1234',
            'full_name' => 'Cliente de prueba',
            'phone' => '',
            'address' => '',
            'city' => '',
            'province' => '',
            'postal_code' => '',
            'role_id' => 2,
            'active' => true,
        ]);
    }
}
