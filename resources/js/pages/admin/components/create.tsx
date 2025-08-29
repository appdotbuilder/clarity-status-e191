import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface ComponentGroup {
    id: number;
    name: string;
    display_order: number;
}

interface Props {
    groups: ComponentGroup[];
    [key: string]: unknown;
}



const statusOptions = [
    { value: 'operational', label: 'Operational', icon: '✅' },
    { value: 'degraded_performance', label: 'Degraded Performance', icon: '⚠️' },
    { value: 'partial_outage', label: 'Partial Outage', icon: '🔶' },
    { value: 'major_outage', label: 'Major Outage', icon: '❌' },
    { value: 'under_maintenance', label: 'Under Maintenance', icon: '🔧' },
];

export default function CreateComponent({ groups }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        status: 'operational',
        display_order: 0,
        group_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.components.store'));
    };

    return (
        <>
            <Head title="Create Component - Admin Dashboard" />
            
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                                <span>➕</span>
                                <span>Create Component</span>
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Add a new component to monitor on your status page
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin/components"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                ← Back to Components
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Component Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Component Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g., API Gateway, Database, Web Application"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Component Group */}
                            <div>
                                <label htmlFor="group_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Component Group *
                                </label>
                                {groups.length === 0 ? (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                        <div className="flex items-center space-x-2">
                                            <span>⚠️</span>
                                            <p className="text-sm text-yellow-800">
                                                No component groups available. You need to create a group first.
                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <Button className="bg-yellow-600 text-white hover:bg-yellow-700" size="sm">
                                                Create Component Group
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <select
                                            id="group_id"
                                            value={data.group_id}
                                            onChange={(e) => setData('group_id', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="">Select a group...</option>
                                            {groups.map(group => (
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.group_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.group_id}</p>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Initial Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.icon} {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            {/* Display Order */}
                            <div>
                                <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    id="display_order"
                                    value={data.display_order.toString()}
                                    onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    min="0"
                                    placeholder="0"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Components with lower numbers appear first within their group
                                </p>
                                {errors.display_order && (
                                    <p className="mt-1 text-sm text-red-600">{errors.display_order}</p>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                <Link
                                    href="/admin/components"
                                    className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing || groups.length === 0}
                                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            <span className="ml-2">Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>✅</span>
                                            <span className="ml-2">Create Component</span>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-blue-900 mb-4">
                            💡 Tips for Creating Components
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start space-x-2">
                                <span>🔧</span>
                                <span>Use descriptive names that your users will understand (e.g., "Web Application" instead of "App Server")</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span>📁</span>
                                <span>Group related components together for better organization</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span>📊</span>
                                <span>Set the display order to control how components appear within their group</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span>⚡</span>
                                <span>Most new components should start with "Operational" status</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}