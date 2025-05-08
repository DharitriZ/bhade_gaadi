import React from 'react'
import { BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';

function PrivateRoutes() {
    const isAuthenticated = true;
    return isAuthenticated ? (
        <div className="flex">


            <Sidebar />

            <div className="flex-1 h-screen w-screen">
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

export default PrivateRoutes
