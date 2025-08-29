<?php

namespace Database\Factories;

use App\Models\ComponentGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Component>
 */
class ComponentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['API Gateway', 'Database', 'Web Application', 'CDN', 'Authentication Service', 'Payment Processing']),
            'status' => fake()->randomElement(['operational', 'degraded_performance', 'partial_outage', 'major_outage', 'under_maintenance']),
            'display_order' => fake()->numberBetween(1, 10),
            'group_id' => ComponentGroup::factory(),
        ];
    }

    /**
     * Indicate that the component is operational.
     */
    public function operational(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'operational',
        ]);
    }
}