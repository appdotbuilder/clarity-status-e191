import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        name: string;
        permissions: string[];
    } | null;
}

interface SharedData {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

interface AuditLog {
    id: number;
    timestamp: string;
    username: string;
    action: string;
    details: string;
}

interface Stats {
    total_components: number;
    total_groups: number;
    active_incidents: number;
    resolved_incidents: number;
    upcoming_maintenance: number;
}

interface Props {
    stats: Stats;
    recentLogs: AuditLog[];
    [key: string]: unknown;
}

const adminTabs = [
    { name: 'Components', href: '/admin/components', icon: '🔧', permission: 'manage_components' },
    { name: 'Incidents', href: '/admin/incidents', icon: '🚨', permission: 'manage_incidents' },
    { name: 'Maintenance', href: '/admin/maintenance', icon: '⚙️', permission: 'manage_maintenance' },
    { name: 'Automations', href: '/admin/automations', icon: '🤖', permission: 'manage_automations' },
    { name: 'Users', href: '/admin/users', icon: '👥', permission: 'manage_users' },
    { name: 'Roles', href: '/admin/roles', icon: '🔐', permission: 'manage_roles' },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: '📋', permission: 'view_audit_logs' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', permission: 'manage_settings' },
];

export default function AdminDashboard({ stats, recentLogs }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const hasPermission = (permission: string): boolean => {
        return user?.role?.permissions?.includes(permission) ?? false;
    };

    const availableTabs = adminTabs.filter(tab => hasPermission(tab.permission));

    return (
        <>
            <Head title="Admin Dashboard - ClarityStatus" />
            
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                🔧 Admin Dashboard
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Welcome back, {user?.name}! Manage your status page here.
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                📊 View Status Page
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">🔧</span>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Components
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.total_components}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">📁</span>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Groups
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.total_groups}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">🚨</span>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Active Incidents
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.active_incidents}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Resolved
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.resolved_incidents}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl">⚙️</span>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Maintenance
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.upcoming_maintenance}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white shadow rounded-lg mb-8">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-6" aria-label="Tabs">
                                {availableTabs.map((tab) => (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2"
                                    >
                                        <span>{tab.icon}</span>
                                        <span>{tab.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600">
                                Select a tab above to manage different aspects of your status page.
                            </p>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                📋 Recent Activity
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Latest actions performed on your status page
                            </p>
                        </div>
                        <div className="px-6 py-4">
                            {recentLogs.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <span className="text-4xl mb-2 block">📝</span>
                                    <p>No recent activity to display.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentLogs.map(log => (
                                        <div key={log.id} className="flex items-start space-x-4 py-2">
                                            <div className="flex-shrink-0">
                                                <span className="text-sm text-gray-400">
                                                    {log.action.includes('incident') ? '🚨' :
                                                     log.action.includes('component') ? '🔧' :
                                                     log.action.includes('maintenance') ? '⚙️' :
                                                     log.action.includes('user') ? '👤' : '📋'}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900">
                                                    <span className="font-medium">{log.username}</span> {log.details}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(log.timestamp).toLocaleDateString()} 
                                                    {' '}{new Date(log.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}