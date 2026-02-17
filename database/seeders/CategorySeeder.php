<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Silla',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Mesa',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Mesita de noche',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Escritorio',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Armario',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Estantería',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Estante',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Cajonera',
            'active' => true,
        ]);

        Category::create([
            'name' => 'Cama',
            'active' => true,
        ]);
    }
}
