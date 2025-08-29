<?php

namespace Database\Seeders;

use App\Models\Automation;
use App\Models\Component;
use App\Models\ComponentGroup;
use App\Models\Incident;
use App\Models\IncidentUpdate;
use App\Models\MaintenanceWindow;
use App\Models\Role;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Seeder;

class StatusPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $superAdminRole = Role::create([
            'name' => 'Super Admin',
            'description' => 'Full access to all features',
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

        $adminRole = Role::create([
            'name' => 'Admin',
            'description' => 'Administrative access',
            'permissions' => [
                'manage_components',
                'manage_incidents',
                'manage_maintenance',
                'manage_automations',
                'view_audit_logs',
            ],
        ]);

        $incidentManagerRole = Role::create([
            'name' => 'Incident Manager',
            'description' => 'Manage incidents and maintenance',
            'permissions' => [
                'manage_incidents',
                'manage_maintenance',
            ],
        ]);

        // Create default admin user
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@claritystatus.dev',
            'password' => 'password',
            'role_id' => $superAdminRole->id,
            'email_verified_at' => now(),
        ]);

        // Create component groups
        $platformGroup = ComponentGroup::create([
            'name' => 'Platform & APIs',
            'display_order' => 1,
            'collapsed_by_default' => false,
        ]);

        $infrastructureGroup = ComponentGroup::create([
            'name' => 'Infrastructure',
            'display_order' => 2,
            'collapsed_by_default' => false,
        ]);

        $customerGroup = ComponentGroup::create([
            'name' => 'Customer Services',
            'display_order' => 3,
            'collapsed_by_default' => true,
        ]);

        // Create components
        $apiGateway = Component::create([
            'name' => 'API Gateway',
            'status' => 'operational',
            'display_order' => 1,
            'group_id' => $platformGroup->id,
        ]);

        $webApp = Component::create([
            'name' => 'Web Application',
            'status' => 'operational',
            'display_order' => 2,
            'group_id' => $platformGroup->id,
        ]);

        $database = Component::create([
            'name' => 'Primary Database',
            'status' => 'operational',
            'display_order' => 1,
            'group_id' => $infrastructureGroup->id,
        ]);

        $cdn = Component::create([
            'name' => 'CDN',
            'status' => 'operational',
            'display_order' => 2,
            'group_id' => $infrastructureGroup->id,
        ]);

        $support = Component::create([
            'name' => 'Customer Support Portal',
            'status' => 'operational',
            'display_order' => 1,
            'group_id' => $customerGroup->id,
        ]);

        // Create some sample incidents
        $activeIncident = Incident::create([
            'title' => 'Elevated API Response Times',
            'status' => 'investigating',
            'impact' => 'minor',
            'impact_description' => 'Some users may experience slower response times when making API requests.',
            'created_at' => now()->subHours(2),
        ]);

        $activeIncident->affectedComponents()->attach([$apiGateway->id]);

        IncidentUpdate::create([
            'message' => 'We are investigating reports of elevated API response times. Our team is working to identify the root cause.',
            'status' => 'investigating',
            'timestamp' => now()->subHours(2),
            'incident_id' => $activeIncident->id,
        ]);

        IncidentUpdate::create([
            'message' => 'We have identified the issue as increased load on our API gateway. We are working to scale resources to handle the demand.',
            'status' => 'identified',
            'timestamp' => now()->subHour(),
            'incident_id' => $activeIncident->id,
        ]);

        // Create a resolved incident
        $resolvedIncident = Incident::create([
            'title' => 'Database Connection Issues',
            'status' => 'resolved',
            'impact' => 'major',
            'impact_description' => 'Users experienced intermittent connection errors when accessing the application.',
            'root_cause' => 'Database connection pool exhaustion due to a memory leak in the application.',
            'created_at' => now()->subDays(3),
            'resolved_at' => now()->subDays(3)->addHours(4),
        ]);

        $resolvedIncident->affectedComponents()->attach([$database->id, $webApp->id]);

        // Create upcoming maintenance
        $maintenance = MaintenanceWindow::create([
            'title' => 'Scheduled Database Maintenance',
            'description' => 'We will be performing routine database maintenance to improve performance and apply security updates.',
            'start_time' => now()->addDays(2)->setTime(2, 0),
            'end_time' => now()->addDays(2)->setTime(6, 0),
        ]);

        $maintenance->affectedComponents()->attach([$database->id, $webApp->id]);

        // Create automation
        $maintenanceAutomation = Automation::create([
            'name' => 'Set All Services to Maintenance',
            'target_status' => 'under_maintenance',
        ]);

        $maintenanceAutomation->components()->attach([
            $apiGateway->id,
            $webApp->id,
            $database->id,
            $cdn->id,
            $support->id,
        ]);

        // Create site settings
        SiteSetting::create([
            'key' => 'maintenance_mode',
            'value' => 'false',
        ]);

        SiteSetting::create([
            'key' => 'maintenance_message',
            'value' => 'We are currently performing scheduled maintenance. Please check back soon.',
        ]);

        SiteSetting::create([
            'key' => 'site_title',
            'value' => 'ClarityStatus',
        ]);
    }
}