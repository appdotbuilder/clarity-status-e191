<?php

namespace Database\Factories;

use App\Models\Incident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IncidentUpdate>
 */
class IncidentUpdateFactory extends Factory
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
            'status' => fake()->randomElement(['investigating', 'identified', 'monitoring', 'resolved']),
            'timestamp' => fake()->dateTimeBetween('-30 days', 'now'),
            'incident_id' => Incident::factory(),
        ];
    }
}