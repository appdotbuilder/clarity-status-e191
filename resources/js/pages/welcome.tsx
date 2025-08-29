import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="ClarityStatus - Professional Open-Source Status Page" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">📊</span>
                                <h1 className="text-xl font-bold text-gray-900">ClarityStatus</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                                >
                                    Get Started
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <div className="text-6xl mb-6">📊</div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Professional
                            <span className="text-blue-600"> Status Page</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Keep your users informed with ClarityStatus - a beautiful, open-source status page 
                            that provides real-time system monitoring, incident management, and maintenance scheduling.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 shadow-lg"
                            >
                                🚀 Create Your Status Page
                            </Link>
                            <Link
                                href="/"
                                className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 shadow-lg border border-gray-200"
                            >
                                📋 View Live Demo
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-4">🔧</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Component Monitoring
                            </h3>
                            <p className="text-gray-600">
                                Monitor multiple services and components with real-time status updates. 
                                Organize into groups and track operational health at a glance.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-4">🚨</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Incident Management
                            </h3>
                            <p className="text-gray-600">
                                Create, track, and resolve incidents with detailed timelines. 
                                Keep users informed with real-time updates and root cause analysis.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-4">⚙️</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Maintenance Windows
                            </h3>
                            <p className="text-gray-600">
                                Schedule and communicate maintenance windows in advance. 
                                Automatically notify users about planned downtime and updates.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Smart Automations
                            </h3>
                            <p className="text-gray-600">
                                Create automations to quickly update multiple components. 
                                Perfect for maintenance mode or bulk status changes.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Role-Based Access
                            </h3>
                            <p className="text-gray-600">
                                Secure admin dashboard with customizable roles and permissions. 
                                Control who can manage incidents, components, and settings.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="text-3xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Audit Logging
                            </h3>
                            <p className="text-gray-600">
                                Complete audit trail of all administrative actions. 
                                Track changes, monitor user activity, and maintain accountability.
                            </p>
                        </div>
                    </div>

                    {/* Status Preview */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            ✨ Beautiful Status Display
                        </h2>
                        
                        {/* Mock Status Banner */}
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-center">
                                <span className="text-4xl mr-4">✅</span>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                                        All Systems Operational
                                    </h3>
                                    <p className="text-green-600">All systems are functioning normally.</p>
                                </div>
                            </div>
                        </div>

                        {/* Mock Component Groups */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">✅</span>
                                        <span className="font-medium text-gray-900">Platform & APIs</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">API Gateway</span>
                                        <span className="text-sm">✅</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Web Application</span>
                                        <span className="text-sm">✅</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Authentication</span>
                                        <span className="text-sm">✅</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg">✅</span>
                                        <span className="font-medium text-gray-900">Infrastructure</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Primary Database</span>
                                        <span className="text-sm">✅</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">CDN</span>
                                        <span className="text-sm">✅</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Load Balancer</span>
                                        <span className="text-sm">✅</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Dashboard Preview */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            🔧 Powerful Admin Dashboard
                        </h2>
                        
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span>🔧</span>
                                        <span className="text-sm text-gray-600">Components</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">12</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span>🚨</span>
                                        <span className="text-sm text-gray-600">Active</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">0</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span>✅</span>
                                        <span className="text-sm text-gray-600">Resolved</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">23</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span>⚙️</span>
                                        <span className="text-sm text-gray-600">Maintenance</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">1</div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    { name: 'Components', icon: '🔧' },
                                    { name: 'Incidents', icon: '🚨' },
                                    { name: 'Maintenance', icon: '⚙️' },
                                    { name: 'Automations', icon: '🤖' },
                                    { name: 'Users', icon: '👥' },
                                    { name: 'Audit Logs', icon: '📋' }
                                ].map(tab => (
                                    <div key={tab.name} className="bg-white px-3 py-2 rounded-md border border-gray-200 text-sm flex items-center space-x-2">
                                        <span>{tab.icon}</span>
                                        <span>{tab.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-blue-600 rounded-xl shadow-lg p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of teams using ClarityStatus to keep their users informed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 shadow-lg"
                            >
                                🚀 Create Free Account
                            </Link>
                            <Link
                                href="/"
                                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700"
                            >
                                📋 View Demo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <h3 className="font-bold text-gray-900">ClarityStatus</h3>
                                    <p className="text-sm text-gray-600">Professional Open-Source Status Page</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <Link href="/login" className="hover:text-gray-900">Login</Link>
                                <Link href="/register" className="hover:text-gray-900">Sign Up</Link>
                                <Link href="/" className="hover:text-gray-900">Live Demo</Link>
                                <Link href="/admin" className="hover:text-gray-900">Admin</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}