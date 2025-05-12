import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { getDashboardAction } from '../store/actions/dashboard';

const Dashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dashboard } = useAppSelector((state) => state.dashboard);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getDashboardAction({})).then(() => {
            setLoading(false);
        });
    }, []);

    const stats = [
        { title: 'Total Users', value: dashboard?.totalUsers },
        { title: 'Active Users', value: dashboard?.activeUsers },
        { title: 'Blocked Users', value: dashboard?.blockedUsers },
        { title: 'Pending Documents', value: dashboard?.pendingDocuments },
        { title: 'Total Documents', value: dashboard?.totalDocuments },
        { title: 'Approved Documents', value: dashboard?.totalApprovedDocuments },
        { title: 'Rejected Documents', value: dashboard?.totalRejectedDocuments },
        { title: 'Total Requirements', value: dashboard?.totalRequirements },
        { title: 'Total Posts', value: dashboard?.totalPosts },
    ];

    return (
        <div className="sm:p-6 p-0">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stats.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-t-blue-900 border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                        >
                            <p className="text-sm text-gray-600">{item.title}</p>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">{item.value}</h2>
                        </div>
                    ))}
                </div>


            )}
        </div>
    );
};

export default Dashboard;
