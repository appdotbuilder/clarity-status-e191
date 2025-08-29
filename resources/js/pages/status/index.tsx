import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';


interface StatusInfo {
    label: string;
    color: string;
    icon: string;
    description: string;
}

interface Component {
    id: number;
    name: string;
    status: string;
}

interface ComponentGroup {
    id: number;
    name: string;
    collapsed_by_default: boolean;
    status: string;
    components: Component[];
}

interface IncidentUpdate {
    id: number;
    message: string;
    status: string;
    timestamp: string;
}

interface Incident {
    id: number;
    title: string;
    status: string;
    impact: string;
    impact_description: string;
    root_cause: string | null;
    duration: string;
    created_at: string;
    is_resolved: boolean;
    affected_components: Component[];
    updates: IncidentUpdate[];
}

interface MaintenanceWindow {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    is_upcoming: boolean;
    affected_components: Component[];
}

interface GroupedIncidents {
    date: string;
    formatted_date: string;
    incidents: Incident[];
}

interface Props {
    overallStatus: string;
    statusInfo: StatusInfo;
    componentGroups: ComponentGroup[];
    activeIncidents: Incident[];
    groupedIncidents: GroupedIncidents[];
    activeMaintenance: MaintenanceWindow[];
    [key: string]: unknown;
}

const statusColors = {
    operational: 'text-green-600 bg-green-50 border-green-200',
    degraded_performance: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    partial_outage: 'text-orange-600 bg-orange-50 border-orange-200',
    major_outage: 'text-red-600 bg-red-50 border-red-200',
    under_maintenance: 'text-blue-600 bg-blue-50 border-blue-200',
};

const statusIcons = {
    operational: '✅',
    degraded_performance: '⚠️',
    partial_outage: '🔶',
    major_outage: '❌',
    under_maintenance: '🔧',
};

const incidentStatusColors = {
    investigating: 'text-red-600 bg-red-50 border-red-200',
    identified: 'text-orange-600 bg-orange-50 border-orange-200',
    monitoring: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    resolved: 'text-green-600 bg-green-50 border-green-200',
};

const impactColors = {
    none: 'text-gray-600 bg-gray-50',
    minor: 'text-yellow-600 bg-yellow-50',
    major: 'text-orange-600 bg-orange-50',
    critical: 'text-red-600 bg-red-50',
};

export default function StatusIndex({
    overallStatus,
    statusInfo,
    componentGroups,
    activeIncidents,
    groupedIncidents,
    activeMaintenance
}: Props) {
    const [collapsedGroups, setCollapsedGroups] = useState<Set<number>>(new Set());
    const [expandedIncidents, setExpandedIncidents] = useState<Set<number>>(new Set());
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Initialize collapsed groups based on their default state
        const defaultCollapsed = new Set<number>();
        componentGroups.forEach(group => {
            if (group.collapsed_by_default) {
                defaultCollapsed.add(group.id);
            }
        });
        setCollapsedGroups(defaultCollapsed);

        // Update current time every second for live duration calculation
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [componentGroups]);

    const toggleGroup = (groupId: number) => {
        const newCollapsed = new Set(collapsedGroups);
        if (newCollapsed.has(groupId)) {
            newCollapsed.delete(groupId);
        } else {
            newCollapsed.add(groupId);
        }
        setCollapsedGroups(newCollapsed);
    };

    const toggleIncident = (incidentId: number) => {
        const newExpanded = new Set(expandedIncidents);
        if (newExpanded.has(incidentId)) {
            newExpanded.delete(incidentId);
        } else {
            newExpanded.add(incidentId);
        }
        setExpandedIncidents(newExpanded);
    };

    const calculateLiveDuration = (createdAt: string) => {
        const created = new Date(createdAt);
        const diff = currentTime.getTime() - created.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ${hours % 24} hour${(hours % 24) > 1 ? 's' : ''}`;
        }
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes % 60} minute${(minutes % 60) > 1 ? 's' : ''}`;
        }
        if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        return '< 1 minute';
    };

    return (
        <>
            <Head title="ClarityStatus - System Status" />
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-bold text-gray-900">
                                📊 ClarityStatus
                            </h1>
                        </div>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href="/history"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                📅 Incident History
                            </Link>
                            <Link
                                href="/admin"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                🔧 Admin Dashboard
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Overall Status Banner */}
                    <div className={`mb-8 p-6 rounded-lg border-2 ${statusColors[overallStatus as keyof typeof statusColors]}`}>
                        <div className="flex items-center justify-center">
                            <span className="text-4xl mr-4">{statusIcons[overallStatus as keyof typeof statusIcons]}</span>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">{statusInfo.label}</h2>
                                <p className="text-sm">{statusInfo.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Scheduled Maintenance Section */}
                    {activeMaintenance.length > 0 && (
                        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                🔧 Scheduled Maintenance
                            </h3>
                            {activeMaintenance.map(maintenance => (
                                <div key={maintenance.id} className="mb-4 last:mb-0">
                                    <h4 className="font-medium text-blue-800">{maintenance.title}</h4>
                                    <p className="text-sm text-blue-700 mb-2">{maintenance.description}</p>
                                    <div className="text-xs text-blue-600">
                                        {new Date(maintenance.start_time).toLocaleDateString()} 
                                        {' '}{new Date(maintenance.start_time).toLocaleTimeString()} - 
                                        {' '}{new Date(maintenance.end_time).toLocaleTimeString()}
                                    </div>
                                    <div className="text-xs text-blue-600 mt-1">
                                        Affected: {maintenance.affected_components.map(c => c.name).join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Component Status Matrix (Mobile First, Desktop Secondary) */}
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                    🔧 System Components
                                </h3>
                                
                                <div className="space-y-4">
                                    {componentGroups.map(group => (
                                        <div key={group.id} className="border border-gray-200 rounded-md">
                                            <button
                                                onClick={() => toggleGroup(group.id)}
                                                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-md"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg">
                                                        {statusIcons[group.status as keyof typeof statusIcons]}
                                                    </span>
                                                    <span className="font-medium text-gray-900">{group.name}</span>
                                                </div>
                                                <span className="text-gray-400">
                                                    {collapsedGroups.has(group.id) ? '▶' : '▼'}
                                                </span>
                                            </button>
                                            
                                            {!collapsedGroups.has(group.id) && (
                                                <div className="border-t border-gray-200 bg-gray-50 p-3 space-y-2">
                                                    {group.components.map(component => (
                                                        <div key={component.id} className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-700">{component.name}</span>
                                                            <span className="text-sm" title={component.status.replace('_', ' ')}>
                                                                {statusIcons[component.status as keyof typeof statusIcons]}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Status Legend */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Status Legend</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center space-x-2">
                                            <span>✅</span>
                                            <span className="text-gray-600">Operational</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>⚠️</span>
                                            <span className="text-gray-600">Degraded Performance</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>🔶</span>
                                            <span className="text-gray-600">Partial Outage</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>❌</span>
                                            <span className="text-gray-600">Major Outage</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>🔧</span>
                                            <span className="text-gray-600">Under Maintenance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Incident Timeline (Mobile Second, Desktop Primary) */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                    📋 Incident Timeline
                                </h3>

                                {/* Active Incidents */}
                                {activeIncidents.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="text-md font-medium text-gray-900 mb-4">🔥 Active Incidents</h4>
                                        <div className="space-y-4">
                                            {activeIncidents.map(incident => (
                                                <div key={incident.id} className="border border-red-200 rounded-lg">
                                                    <button
                                                        onClick={() => toggleIncident(incident.id)}
                                                        className="w-full p-4 text-left hover:bg-red-50 rounded-lg"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-3 mb-2">
                                                                    <span className={`px-2 py-1 text-xs rounded-full border ${incidentStatusColors[incident.status as keyof typeof incidentStatusColors]}`}>
                                                                        {incident.status.replace('_', ' ').toUpperCase()}
                                                                    </span>
                                                                    <span className={`px-2 py-1 text-xs rounded-full ${impactColors[incident.impact as keyof typeof impactColors]}`}>
                                                                        {incident.impact.toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <h5 className="font-medium text-gray-900">{incident.title}</h5>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    Started {calculateLiveDuration(incident.created_at)} ago
                                                                </p>
                                                            </div>
                                                            <span className="text-gray-400 ml-2">
                                                                {expandedIncidents.has(incident.id) ? '▼' : '▶'}
                                                            </span>
                                                        </div>
                                                    </button>
                                                    
                                                    {expandedIncidents.has(incident.id) && (
                                                        <div className="border-t border-red-200 p-4 bg-red-50">
                                                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                                                <div>
                                                                    <strong>Impact:</strong> {incident.impact_description}
                                                                </div>
                                                                <div>
                                                                    <strong>Affected:</strong> {incident.affected_components.map(c => c.name).join(', ')}
                                                                </div>
                                                                <div>
                                                                    <strong>Duration:</strong> {calculateLiveDuration(incident.created_at)}
                                                                </div>
                                                                <div>
                                                                    <strong>Status:</strong> {incident.status.replace('_', ' ')}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="border-t border-red-200 pt-4">
                                                                <h6 className="font-medium text-gray-900 mb-2">Updates</h6>
                                                                <div className="space-y-3">
                                                                    {incident.updates.map(update => (
                                                                        <div key={update.id} className="flex space-x-3">
                                                                            <span className="text-sm">🔄</span>
                                                                            <div className="flex-1">
                                                                                <p className="text-sm text-gray-700 whitespace-pre-line">
                                                                                    {update.message}
                                                                                </p>
                                                                                <p className="text-xs text-gray-500 mt-1">
                                                                                    {new Date(update.timestamp).toLocaleDateString()} {new Date(update.timestamp).toLocaleTimeString()}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Historical Incidents */}
                                <div className="space-y-6">
                                    {groupedIncidents.length === 0 && activeIncidents.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <span className="text-4xl mb-2 block">🎉</span>
                                            <p>No incidents to report. All systems running smoothly!</p>
                                        </div>
                                    ) : (
                                        groupedIncidents.map(group => (
                                            <div key={group.date}>
                                                <h4 className="text-sm font-medium text-gray-900 mb-3 sticky top-20 bg-white py-2">
                                                    {group.formatted_date}
                                                </h4>
                                                <div className="space-y-3 mb-6">
                                                    {group.incidents.map(incident => (
                                                        <div key={incident.id} className="border border-gray-200 rounded-lg">
                                                            <button
                                                                onClick={() => toggleIncident(incident.id)}
                                                                className="w-full p-4 text-left hover:bg-gray-50 rounded-lg"
                                                            >
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center space-x-3 mb-2">
                                                                            <span className="px-2 py-1 text-xs rounded-full bg-green-50 text-green-600 border border-green-200">
                                                                                RESOLVED
                                                                            </span>
                                                                            <span className={`px-2 py-1 text-xs rounded-full ${impactColors[incident.impact as keyof typeof impactColors]}`}>
                                                                                {incident.impact.toUpperCase()}
                                                                            </span>
                                                                        </div>
                                                                        <h5 className="font-medium text-gray-900">{incident.title}</h5>
                                                                        <p className="text-sm text-gray-600 mt-1">
                                                                            Duration: {incident.duration}
                                                                        </p>
                                                                    </div>
                                                                    <span className="text-gray-400 ml-2">
                                                                        {expandedIncidents.has(incident.id) ? '▼' : '▶'}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                            
                                                            {expandedIncidents.has(incident.id) && (
                                                                <div className="border-t border-gray-200 p-4 bg-gray-50">
                                                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                                                        <div>
                                                                            <strong>Impact:</strong> {incident.impact_description}
                                                                        </div>
                                                                        <div>
                                                                            <strong>Affected:</strong> {incident.affected_components.map(c => c.name).join(', ')}
                                                                        </div>
                                                                        <div>
                                                                            <strong>Duration:</strong> {incident.duration}
                                                                        </div>
                                                                        {incident.root_cause && (
                                                                            <div>
                                                                                <strong>Root Cause:</strong> {incident.root_cause}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    
                                                                    <div className="border-t border-gray-200 pt-4">
                                                                        <h6 className="font-medium text-gray-900 mb-2">Updates</h6>
                                                                        <div className="space-y-3">
                                                                            {incident.updates.map(update => (
                                                                                <div key={update.id} className="flex space-x-3">
                                                                                    <span className="text-sm">
                                                                                        {update.status === 'resolved' ? '✅' : '🔄'}
                                                                                    </span>
                                                                                    <div className="flex-1">
                                                                                        <p className="text-sm text-gray-700 whitespace-pre-line">
                                                                                            {update.message}
                                                                                        </p>
                                                                                        <p className="text-xs text-gray-500 mt-1">
                                                                                            {new Date(update.timestamp).toLocaleDateString()} {new Date(update.timestamp).toLocaleTimeString()}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}