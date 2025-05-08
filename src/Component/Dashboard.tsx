import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { dashboardStats, recentActivity } from '../data/mockData';
import StatCard from '../ui/StatCard';
import ActivityItem from '../ui/ActivityItem';

const Dashboard = () => {
    const { loading } = useAdmin();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Define status styles with 'as const' for literal types
    const statusStyles = {
        pending: 'bg-amber-100 text-amber-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    } as const; // This ensures that the keys are treated as 'pending', 'approved', 'rejected'

    // Type for valid status values
    type Status = keyof typeof statusStyles;

    // Generate mock status for demonstration
    const mockStatuses: Status[] = ['pending', 'approved', 'rejected'];

    return (
        <div>
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of the system.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden lg:col-span-2">
                    <div className="px-6 py-4 border-b">
                        <h2 className="font-semibold text-gray-800">Recent User Requests</h2>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['User', 'Document', 'Status', 'Date'].map((header) => (
                                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[...Array(5)].map((_, index) => {
                                    const status = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

                                    return (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">user{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">document{index + 1}.pdf</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${statusStyles[status]}`}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="font-semibold text-gray-800">Recent Activity</h2>
                    </div>
                    <div className="p-4 space-y-4">
                        {recentActivity.map((activity) => (
                            <ActivityItem
                                key={activity.id}
                                action={activity.action as any} // If 'action' has a specific type, replace 'any' with that type
                                username={activity.username}
                                time={activity.time}
                                reason={activity.reason}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
