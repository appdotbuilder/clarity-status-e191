<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Component;
use App\Models\ComponentGroup;
use App\Models\Incident;
use App\Models\MaintenanceWindow;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Check permissions
        if (!auth()->user()->hasPermission('manage_components') && 
            !auth()->user()->hasPermission('manage_incidents') &&
            !auth()->user()->hasPermission('manage_maintenance')) {
            abort(403, 'Unauthorized access to admin dashboard.');
        }

        $stats = [
            'total_components' => Component::count(),
            'total_groups' => ComponentGroup::count(),
            'active_incidents' => Incident::active()->count(),
            'resolved_incidents' => Incident::resolved()->count(),
            'upcoming_maintenance' => MaintenanceWindow::upcoming()->count(),
        ];

        $recentLogs = AuditLog::orderBy('timestamp', 'desc')->take(10)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentLogs' => $recentLogs,
        ]);
    }
}