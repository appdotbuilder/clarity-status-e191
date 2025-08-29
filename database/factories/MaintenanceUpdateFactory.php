<?php

namespace Database\Factories;

use App\Models\MaintenanceWindow;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenanceUpdate>
 */
class MaintenanceUpdateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message' => fake()->paragraph(),
            'timestamp' => fake()->dateTimeBetween('-30 days', 'now'),
            'maintenance_id' => MaintenanceWindow::factory(),
        ];
    }
}