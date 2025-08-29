<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(['Super Admin', 'Admin', 'Incident Manager', 'Component Manager', 'Agent']),
            'description' => fake()->sentence(),
            'permissions' => ['manage_components', 'manage_incidents'],
        ];
    }

    /**
     * Indicate that the role is a super admin.
     */
    public function superAdmin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Super Admin',
            'permissions' => [
                'manage_components',
                'manage_incidents',
                'manage_maintenance',
                'manage_automations',
                'manage_users',
                'manage_roles',
                'view_audit_logs',
                'manage_settings',
            ],
        ]);
    }
}