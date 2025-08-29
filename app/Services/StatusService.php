<?php

namespace App\Services;

use App\Models\Component;
use App\Models\ComponentGroup;
use App\Models\Incident;
use App\Models\MaintenanceWindow;

class StatusService
{
    /**
     * Get the overall system status based on all components.
     *
     * @return string
     */
    public function getOverallStatus(): string
    {
        $statuses = Component::pluck('status')->toArray();
        
        if (in_array('major_outage', $statuses)) {
            return 'major_outage';
        }
        if (in_array('partial_outage', $statuses)) {
            return 'partial_outage';
        }
        if (in_array('degraded_performance', $statuses)) {
            return 'degraded_performance';
        }
        if (in_array('under_maintenance', $statuses)) {
            return 'under_maintenance';
        }
        
        return 'operational';
    }

    /**
     * Get the status display information.
     *
     * @param string $status
     * @return array
     */
    public function getStatusInfo(string $status): array
    {
        $statusMap = [
            'operational' => [
                'label' => 'All Systems Operational',
                'color' => 'green',
                'icon' => 'check-circle',
                'description' => 'All systems are functioning normally.',
            ],
            'degraded_performance' => [
                'label' => 'Degraded Performance',
                'color' => 'yellow',
                'icon' => 'exclamation-triangle',
                'description' => 'Some systems are experiencing performance issues.',
            ],
            'partial_outage' => [
                'label' => 'Partial Outage',
                'color' => 'orange',
                'icon' => 'exclamation-circle',
                'description' => 'Some services are currently unavailable.',
            ],
            'major_outage' => [
                'label' => 'Major Outage',
                'color' => 'red',
                'icon' => 'times-circle',
                'description' => 'Multiple services are experiencing significant issues.',
            ],
            'under_maintenance' => [
                'label' => 'Under Maintenance',
                'color' => 'blue',
                'icon' => 'tools',
                'description' => 'Scheduled maintenance is in progress.',
            ],
        ];

        return $statusMap[$status] ?? $statusMap['operational'];
    }

    /**
     * Get components grouped by their groups.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getComponentsByGroups()
    {
        return ComponentGroup::with(['components' => function ($query) {
            $query->orderBy('display_order');
        }])->orderBy('display_order')->get();
    }

    /**
     * Get active incidents.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getActiveIncidents()
    {
        return Incident::active()
            ->with(['affectedComponents', 'updates'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get recent resolved incidents (last 15 days).
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getRecentIncidents()
    {
        return Incident::resolved()
            ->with(['affectedComponents', 'updates'])
            ->where('resolved_at', '>=', now()->subDays(15))
            ->orderBy('resolved_at', 'desc')
            ->get();
    }

    /**
     * Get active and upcoming maintenance windows.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getActiveMaintenance()
    {
        return MaintenanceWindow::where(function ($query) {
            $query->where('start_time', '<=', now())
                  ->where('end_time', '>=', now());
        })->orWhere('start_time', '>', now())
          ->with(['affectedComponents', 'updates'])
          ->orderBy('start_time')
          ->get();
    }

    /**
     * Get incidents grouped by date.
     *
     * @param \Illuminate\Database\Eloquent\Collection $incidents
     * @return array
     */
    public function groupIncidentsByDate($incidents): array
    {
        return $incidents->groupBy(function ($incident) {
            /** @var \App\Models\Incident $incident */
            return $incident->created_at->format('Y-m-d');
        })->map(function ($dayIncidents, $date) {
            return [
                'date' => $date,
                'formatted_date' => \Carbon\Carbon::parse($date)->format('F j, Y'),
                'incidents' => $dayIncidents,
            ];
        })->sortByDesc('date')->values()->toArray();
    }
}