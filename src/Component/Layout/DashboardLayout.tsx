import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutAction } from '../../store/actions/auth';
import { Car, FileText } from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = async () => {
        await dispatch(logoutAction());
        navigate('/login');
    };

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: 'Car Types',
            path: '/car-types',
            icon: (
                <Car className="w-6 h-8 text-gray" />
            ),
        },
        {
            name: 'Requests',
            path: '/review-documents',
            icon: (
                <FileText className="w-6 h-8 text-gray" />
            ),
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Mobile Drawer Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden ${isDrawerOpen ? 'block' : 'hidden'
                    }`}
                onClick={() => setIsDrawerOpen(false)}
            >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </div>

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1E3A8A] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 bg-[#1E3A8A]/90">
                        <h1 className="text-xl font-bold text-white">Car Rentals</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${location.pathname === item.path
                                    ? 'bg-[#1E3A8A]/90 text-white'
                                    : 'text-gray-300 hover:bg-[#1E3A8A]/90 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Info and Logout */}
                    <div className="p-4 border-t border-[#1E3A8A]/90">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600">
                                        {user?.fullName?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">
                                    {user?.fullName || 'User'}
                                </p>
                                <p className="text-xs text-gray-300">{user?.phoneNumber}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-4 w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1E3A8A]/90 rounded-md"
                        >
                            <svg
                                className="w-6 h-6 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white shadow-sm lg:hidden">
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="text-gray-500 hover:text-gray-600 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <h1 className="ml-4 text-lg font-semibold text-[#1E3A8A]">Bhade Gaadi</h1>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout; 