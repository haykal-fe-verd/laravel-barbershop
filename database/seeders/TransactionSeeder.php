<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Transaction::factory(100)->create();

        Transaction::factory()->create([
            'no_antrian' => "001",
            'is_active_antrian' => false

        ]);
        Transaction::factory()->create([
            'no_antrian' => "002",
            'is_active_antrian' => false

        ]);
        Transaction::factory()->create([
            'no_antrian' => "003",
            'is_active_antrian' => false

        ]);
        Transaction::factory()->create([
            'no_antrian' => "004",
            'is_active_antrian' => false

        ]);
    }
}
