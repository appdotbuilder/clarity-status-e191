<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'timestamp' => fake()->dateTimeBetween('-30 days', 'now'),
            'username' => fake()->userName(),
            'action' => fake()->randomElement(['created_incident', 'updated_incident', 'resolved_incident', 'updated_component', 'created_maintenance']),
            'details' => fake()->sentence(),
        ];
    }
}