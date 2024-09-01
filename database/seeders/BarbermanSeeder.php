<?php

namespace Database\Seeders;

use App\Models\Barberman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarbermanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Barberman::factory()->count(10)->create();
    }
}
