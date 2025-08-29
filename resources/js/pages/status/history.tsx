import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

interface Component {
    id: number;
    name: string;
    status: string;
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
    resolved_at: string;
    affected_components: Component[];
    updates: IncidentUpdate[];
}

interface PaginatedIncidents {
    data: Incident[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface Props {
    incidents: PaginatedIncidents;
    [key: string]: unknown;
}

const impactColors = {
    none: 'text-gray-600 bg-gray-50',
    minor: 'text-yellow-600 bg-yellow-50',
    major: 'text-orange-600 bg-orange-50',
    critical: 'text-red-600 bg-red-50',
};

export default function StatusHistory({ incidents }: Props) {
    const [expandedIncidents, setExpandedIncidents] = useState<Set<number>>(new Set());
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    const toggleIncident = (incidentId: number) => {
        const newExpanded = new Set(expandedIncidents);
        if (newExpanded.has(incidentId)) {
            newExpanded.delete(incidentId);
        } else {
            newExpanded.add(incidentId);
        }
        setExpandedIncidents(newExpanded);
    };

    // Get available years and months for filters
    const availableYears = [...new Set(incidents.data.map(incident => 
        new Date(incident.created_at).getFullYear().toString()
    ))].sort().reverse();

    const availableMonths = selectedYear ? [...new Set(incidents.data
        .filter(incident => new Date(incident.created_at).getFullYear().toString() === selectedYear)
        .map(incident => (new Date(incident.created_at).getMonth() + 1).toString().padStart(2, '0'))
    )].sort().reverse() : [];

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <>
            <Head title="ClarityStatus - Incident History" />
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
                                📊 ClarityStatus
                            </Link>
                            <span className="text-gray-400">|</span>
                            <h1 className="text-lg font-medium text-gray-700">
                                📅 Incident History
                            </h1>
                        </div>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                ← Back to Status
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
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            🔍 Filter Incidents
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => {
                                        setSelectedYear(e.target.value);
                                        setSelectedMonth('');
                                    }}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">All Years</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Month
                                </label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    disabled={!selectedYear}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                                >
                                    <option value="">All Months</option>
                                    {availableMonths.map(month => (
                                        <option key={month} value={month}>
                                            {monthNames[parseInt(month) - 1]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSelectedYear('');
                                        setSelectedMonth('');
                                    }}
                                    className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Incidents List */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                📋 Historical Incidents
                            </h2>
                            <div className="text-sm text-gray-500">
                                Showing {incidents.data.length} of {incidents.total} incidents
                            </div>
                        </div>

                        {incidents.data.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <span className="text-4xl mb-4 block">📝</span>
                                <p className="text-lg">No incidents found for the selected filters.</p>
                                <p className="text-sm mt-2">Try adjusting your search criteria.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {incidents.data.map(incident => (
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
                                                    <h3 className="font-medium text-gray-900 mb-1">{incident.title}</h3>
                                                    <div className="text-sm text-gray-600">
                                                        <div>Duration: {incident.duration}</div>
                                                        <div>
                                                            {new Date(incident.created_at).toLocaleDateString()} - 
                                                            {' '}{new Date(incident.resolved_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-gray-400 ml-2">
                                                    {expandedIncidents.has(incident.id) ? '▼' : '▶'}
                                                </span>
                                            </div>
                                        </button>
                                        
                                        {expandedIncidents.has(incident.id) && (
                                            <div className="border-t border-gray-200 p-4 bg-gray-50">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                                                    <div>
                                                        <strong className="text-gray-900">Impact Description:</strong>
                                                        <p className="text-gray-700 mt-1">{incident.impact_description}</p>
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-900">Affected Components:</strong>
                                                        <p className="text-gray-700 mt-1">
                                                            {incident.affected_components.map(c => c.name).join(', ')}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-900">Duration:</strong>
                                                        <p className="text-gray-700 mt-1">{incident.duration}</p>
                                                    </div>
                                                    {incident.root_cause && (
                                                        <div>
                                                            <strong className="text-gray-900">Root Cause:</strong>
                                                            <p className="text-gray-700 mt-1">{incident.root_cause}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="border-t border-gray-200 pt-4">
                                                    <h4 className="font-medium text-gray-900 mb-3">Update Timeline</h4>
                                                    <div className="space-y-3">
                                                        {incident.updates.map(update => (
                                                            <div key={update.id} className="flex space-x-3">
                                                                <div className="flex-shrink-0">
                                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs">
                                                                        {update.status === 'resolved' ? '✅' : 
                                                                         update.status === 'monitoring' ? '👀' :
                                                                         update.status === 'identified' ? '🔍' : '🚨'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center space-x-2 mb-1">
                                                                        <span className="text-xs font-medium text-gray-900 uppercase">
                                                                            {update.status.replace('_', ' ')}
                                                                        </span>
                                                                        <span className="text-xs text-gray-500">
                                                                            {new Date(update.timestamp).toLocaleDateString()} 
                                                                            {' '}{new Date(update.timestamp).toLocaleTimeString()}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-700 whitespace-pre-line">
                                                                        {update.message}
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
                        )}

                        {/* Pagination */}
                        {incidents.last_page > 1 && (
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    {incidents.prev_page_url && (
                                        <Link
                                            href={incidents.prev_page_url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {incidents.next_page_url && (
                                        <Link
                                            href={incidents.next_page_url}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing page <span className="font-medium">{incidents.current_page}</span> of{' '}
                                            <span className="font-medium">{incidents.last_page}</span>
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        {incidents.prev_page_url && (
                                            <Link
                                                href={incidents.prev_page_url}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {incidents.next_page_url && (
                                            <Link
                                                href={incidents.next_page_url}
                                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}