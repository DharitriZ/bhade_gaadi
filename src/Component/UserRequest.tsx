import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import RequestCard from './userRequests/RequestCard';
import RequestFilters from './userRequests/RequestFilters';
import { UserRequest } from '../types';

const UserRequests: React.FC = () => {
    const { userRequests, updateRequestStatus, loading } = useAdmin();
    const [filters, setFilters] = useState({ search: '', status: 'all' });
    const [filteredRequests, setFilteredRequests] = useState<UserRequest[]>([]);

    useEffect(() => {
        const filtered = userRequests.filter(({ username, email, status }) => {
            const searchMatch = filters.search
                ? username.toLowerCase().includes(filters.search.toLowerCase()) ||
                email.toLowerCase().includes(filters.search.toLowerCase())
                : true;
            const statusMatch = filters.status === 'all' || status === filters.status;
            return searchMatch && statusMatch;
        });
        setFilteredRequests(filtered);
    }, [userRequests, filters]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">User Requests</h1>
                <p className="text-gray-600 mt-1">Manage and review user verification requests.</p>
            </header>

            <RequestFilters onFilterChange={setFilters} />

            {filteredRequests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">No requests found with the current filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRequests.map((request) => (
                        <RequestCard
                            key={request.id}
                            request={request}
                            onStatusUpdate={updateRequestStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserRequests;
