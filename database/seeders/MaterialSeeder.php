<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materiales = [
            'Roble',
            'Nogal',
            'Pino',
            'Cerezo',
            'Haya',
            'Abeto',
            'Contrachapado',
        ];

        foreach ($materiales as $material) {
            Material::create([
                'name' => $material,
                'active' => true,
            ]);
        }

    }
}
