<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Incident>
 */
class IncidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $resolved = fake()->boolean(70);
        
        return [
            'title' => fake()->sentence(4),
            'resolved_at' => $resolved ? fake()->dateTimeBetween('-7 days', 'now') : null,
            'status' => $resolved ? 'resolved' : fake()->randomElement(['investigating', 'identified', 'monitoring']),
            'impact' => fake()->randomElement(['none', 'minor', 'major', 'critical']),
            'impact_description' => fake()->paragraph(),
            'root_cause' => $resolved ? fake()->sentence() : null,
        ];
    }

    /**
     * Indicate that the incident is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'resolved_at' => null,
            'status' => fake()->randomElement(['investigating', 'identified', 'monitoring']),
            'root_cause' => null,
        ]);
    }
}