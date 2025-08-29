<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaintenanceWindow>
 */
class MaintenanceWindowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = fake()->dateTimeBetween('-30 days', '+30 days');
        $endTime = fake()->dateTimeBetween($startTime, $startTime->format('Y-m-d H:i:s') . ' +4 hours');
        
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'start_time' => $startTime,
            'end_time' => $endTime,
        ];
    }

    /**
     * Indicate that the maintenance is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_time' => fake()->dateTimeBetween('+1 day', '+30 days'),
        ]);
    }
}