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
        User::factory()->create([
            'name' => 'User Admin',
            'email' => 'admin@admin.com',
            'role' => 'admin'
        ]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@user.com',
            'role' => 'user'
        ]);
    }
}
