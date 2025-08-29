<?php

namespace App\Http\Controllers;

use App\Services\StatusService;
use Inertia\Inertia;

class StatusController extends Controller
{
    /**
     * The status service instance.
     *
     * @var StatusService
     */
    protected $statusService;

    /**
     * Create a new controller instance.
     *
     * @param StatusService $statusService
     */
    public function __construct(StatusService $statusService)
    {
        $this->statusService = $statusService;
    }

    /**
     * Display the main status page.
     */
    public function index()
    {
        $overallStatus = $this->statusService->getOverallStatus();
        $statusInfo = $this->statusService->getStatusInfo($overallStatus);
        $componentGroups = $this->statusService->getComponentsByGroups();
        $activeIncidents = $this->statusService->getActiveIncidents();
        $recentIncidents = $this->statusService->getRecentIncidents();
        $activeMaintenance = $this->statusService->getActiveMaintenance();
        
        // Group incidents by date
        $groupedIncidents = $this->statusService->groupIncidentsByDate($recentIncidents);
        
        return Inertia::render('status/index', [
            'overallStatus' => $overallStatus,
            'statusInfo' => $statusInfo,
            'componentGroups' => $componentGroups,
            'activeIncidents' => $activeIncidents,
            'groupedIncidents' => $groupedIncidents,
            'activeMaintenance' => $activeMaintenance,
        ]);
    }

    /**
     * Display the incident history page.
     */
    public function show()
    {
        // Get all resolved incidents for history
        $incidents = \App\Models\Incident::resolved()
            ->with(['affectedComponents', 'updates'])
            ->orderBy('resolved_at', 'desc')
            ->paginate(20);
        
        return Inertia::render('status/history', [
            'incidents' => $incidents,
        ]);
    }
}