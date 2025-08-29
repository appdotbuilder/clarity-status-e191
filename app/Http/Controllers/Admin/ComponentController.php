<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComponentRequest;
use App\Http\Requests\UpdateComponentRequest;
use App\Models\AuditLog;
use App\Models\Component;
use App\Models\ComponentGroup;
use Inertia\Inertia;

class ComponentController extends Controller
{
    /**
     * Display a listing of components.
     */
    public function index()
    {
        if (!auth()->user()->hasPermission('manage_components')) {
            abort(403, 'Unauthorized to manage components.');
        }

        $groups = ComponentGroup::with(['components' => function ($query) {
            $query->orderBy('display_order');
        }])->orderBy('display_order')->get();

        return Inertia::render('admin/components/index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new component.
     */
    public function create()
    {
        if (!auth()->user()->hasPermission('manage_components')) {
            abort(403, 'Unauthorized to manage components.');
        }

        $groups = ComponentGroup::orderBy('display_order')->get();

        return Inertia::render('admin/components/create', [
            'groups' => $groups,
        ]);
    }

    /**
     * Store a newly created component.
     */
    public function store(StoreComponentRequest $request)
    {
        if (!auth()->user()->hasPermission('manage_components')) {
            abort(403, 'Unauthorized to manage components.');
        }

        $component = Component::create($request->validated());

        AuditLog::log(
            auth()->user()->name,
            'created_component',
            "Created component '{$component->name}'"
        );

        return redirect()->route('admin.components.index')
            ->with('success', 'Component created successfully.');
    }

    /**
     * Update the specified component.
     */
    public function update(UpdateComponentRequest $request, Component $component)
    {
        if (!auth()->user()->hasPermission('manage_components')) {
            abort(403, 'Unauthorized to manage components.');
        }

        $oldStatus = $component->status;
        $component->update($request->validated());

        if ($oldStatus !== $component->status) {
            AuditLog::log(
                auth()->user()->name,
                'updated_component_status',
                "Changed component '{$component->name}' status from {$oldStatus} to {$component->status}"
            );
        } else {
            AuditLog::log(
                auth()->user()->name,
                'updated_component',
                "Updated component '{$component->name}'"
            );
        }

        return redirect()->route('admin.components.index')
            ->with('success', 'Component updated successfully.');
    }

    /**
     * Remove the specified component.
     */
    public function destroy(Component $component)
    {
        if (!auth()->user()->hasPermission('manage_components')) {
            abort(403, 'Unauthorized to manage components.');
        }

        $name = $component->name;
        $component->delete();

        AuditLog::log(
            auth()->user()->name,
            'deleted_component',
            "Deleted component '{$name}'"
        );

        return redirect()->route('admin.components.index')
            ->with('success', 'Component deleted successfully.');
    }
}