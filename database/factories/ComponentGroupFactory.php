<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ComponentGroup>
 */
class ComponentGroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Platform & APIs', 'Infrastructure', 'Customer Services', 'Third-party Services']),
            'display_order' => fake()->numberBetween(1, 10),
            'collapsed_by_default' => fake()->boolean(20),
        ];
    }
}