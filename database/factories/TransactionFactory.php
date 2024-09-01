<?php

namespace Database\Factories;

use App\Models\Barberman;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "id_user" => fake()->randomElement(User::pluck('id')),
            "id_product" => fake()->randomElement(Product::pluck('id')),
            "id_barberman" => fake()->randomElement(Barberman::pluck('id')),
            "invoice" => fake()->asciify('********************'),
            "snap_token" => "test_token",
            "snap_url" => "https://test.com",
            "via" => fake()->randomElement(['qris', 'bank_transfer', 'tunai']),
            "total" => fake()->randomFloat(2, 10000, 1000000),
            "no_antrian" => fake()->randomElement(["001", "002", "003", "004", "005"]),
            "is_active_antrian" => fake()->randomElement([true, false]),
            "status" => fake()->randomElement(['pending', 'settlement', 'cancel', 'expire', 'failure']),
            "status_pangkas" => fake()->randomElement(['pending', 'success']),
        ];
    }
}
