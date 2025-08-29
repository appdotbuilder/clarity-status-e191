<?php

use App\Http\Controllers\Admin\ComponentController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public status page routes
Route::get('/', [StatusController::class, 'index'])->name('status.index');
Route::get('/history', [StatusController::class, 'show'])->name('status.history');

// Authentication required routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // Component management
        Route::resource('components', ComponentController::class);
        
        // Component group management (will add this later)
        // Route::resource('component-groups', ComponentGroupController::class);
        
        // Incident management (will add this later)
        // Route::resource('incidents', IncidentController::class);
        
        // Maintenance management (will add this later)
        // Route::resource('maintenance', MaintenanceController::class);
        
        // User management (will add this later)
        // Route::resource('users', UserController::class);
        
        // Role management (will add this later)
        // Route::resource('roles', RoleController::class);
        
        // Automation management (will add this later)
        // Route::resource('automations', AutomationController::class);
        
        // Audit logs (will add this later)
        // Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit-logs');
        
        // Settings (will add this later)
        // Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
        // Route::post('/settings', [SettingsController::class, 'store'])->name('settings.store');
    });
});

// Profile management is handled in settings.php

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';