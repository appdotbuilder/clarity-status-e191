import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Component {
    id: number;
    name: string;
    status: string;
    display_order: number;
}

interface ComponentGroup {
    id: number;
    name: string;
    display_order: number;
    collapsed_by_default: boolean;
    components: Component[];
}

interface Props {
    groups: ComponentGroup[];
    [key: string]: unknown;
}

const statusOptions = [
    { value: 'operational', label: 'Operational', icon: '✅', color: 'text-green-600' },
    { value: 'degraded_performance', label: 'Degraded Performance', icon: '⚠️', color: 'text-yellow-600' },
    { value: 'partial_outage', label: 'Partial Outage', icon: '🔶', color: 'text-orange-600' },
    { value: 'major_outage', label: 'Major Outage', icon: '❌', color: 'text-red-600' },
    { value: 'under_maintenance', label: 'Under Maintenance', icon: '🔧', color: 'text-blue-600' },
];

const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
};

export default function ComponentsIndex({ groups }: Props) {
    const [collapsedGroups, setCollapsedGroups] = useState<Set<number>>(new Set());

    const toggleGroup = (groupId: number) => {
        const newCollapsed = new Set(collapsedGroups);
        if (newCollapsed.has(groupId)) {
            newCollapsed.delete(groupId);
        } else {
            newCollapsed.add(groupId);
        }
        setCollapsedGroups(newCollapsed);
    };

    const updateComponentStatus = (componentId: number, newStatus: string) => {
        router.put(`/admin/components/${componentId}`, {
            status: newStatus
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const deleteComponent = (componentId: number, componentName: string) => {
        if (confirm(`Are you sure you want to delete "${componentName}"? This action cannot be undone.`)) {
            router.delete(`/admin/components/${componentId}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Components - Admin Dashboard" />
            
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                                <span>🔧</span>
                                <span>Component Management</span>
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage your system components and their statuses
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                ← Back to Dashboard
                            </Link>
                            <Link
                                href="/admin/components/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                ➕ Add Component
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {groups.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                            <div className="text-center">
                                <span className="text-6xl mb-4 block">🔧</span>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No Component Groups Found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Get started by creating your first component group and adding components to it.
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                        Create Component Group
                                    </Button>
                                    <Link
                                        href="/admin/components/create"
                                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                                    >
                                        Add Component
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {groups.map(group => (
                                <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="border-b border-gray-200">
                                        <button
                                            onClick={() => toggleGroup(group.id)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <span className="text-2xl">📁</span>
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {group.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {group.components.length} component{group.components.length !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit Group
                                                </Button>
                                                <span className="text-gray-400">
                                                    {collapsedGroups.has(group.id) ? '▶' : '▼'}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                    
                                    {!collapsedGroups.has(group.id) && (
                                        <div className="p-6">
                                            {group.components.length === 0 ? (
                                                <div className="text-center py-8 text-gray-500">
                                                    <span className="text-3xl mb-2 block">🔧</span>
                                                    <p>No components in this group yet.</p>
                                                    <Link
                                                        href="/admin/components/create"
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Add your first component →
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {group.components.map(component => {
                                                        const statusInfo = getStatusInfo(component.status);
                                                        return (
                                                            <div key={component.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                                                <div className="flex items-center space-x-4">
                                                                    <span className="text-xl" title={statusInfo.label}>
                                                                        {statusInfo.icon}
                                                                    </span>
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-900">
                                                                            {component.name}
                                                                        </h4>
                                                                        <p className={`text-sm ${statusInfo.color}`}>
                                                                            {statusInfo.label}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="flex items-center space-x-2">
                                                                    <select
                                                                        value={component.status}
                                                                        onChange={(e) => updateComponentStatus(component.id, e.target.value)}
                                                                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:border-blue-500 focus:ring-blue-500"
                                                                    >
                                                                        {statusOptions.map(option => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.icon} {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    
                                                                    <Button variant="outline" size="sm">
                                                                        ✏️
                                                                    </Button>
                                                                    
                                                                    <Button 
                                                                        variant="outline" 
                                                                        size="sm"
                                                                        onClick={() => deleteComponent(component.id, component.name)}
                                                                        className="text-red-600 hover:text-red-800 hover:border-red-300"
                                                                    >
                                                                        🗑️
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}