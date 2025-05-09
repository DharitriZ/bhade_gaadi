import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store'; // adjust path according to your project
import Sidebar from '../Component/Sidebar';

function PrivateRoutes() {
    const token = useSelector((state: RootState) => state.auth.token);

    const isAuthenticated = !!token; // if token exists, user is authenticated

    return isAuthenticated ? (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 px-5 py-2 bg-gray-200 overflow-auto">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
}

export default PrivateRoutes;
