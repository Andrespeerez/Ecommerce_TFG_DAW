<?php

namespace Database\Seeders;

use App\Models\Finish;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FinishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $finishes = [
            'Barniz Mate',
            'Barniz Satinado',
            'Barniz Brillo',
            'Cera Natural',
            'Lacado Blanco',
            'Lacado Negro',
        ];

        foreach ($finishes as $finish) {
            Finish::create([
                'name' => $finish,
                'active' => true,
            ]);
        }
    }
}
