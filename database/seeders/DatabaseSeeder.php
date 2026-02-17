<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call all seeder classes (order matters)
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            MaterialSeeder::class,
            FinishSeeder::class,
        ]);
    }
}
