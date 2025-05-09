import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Menu, X, ChevronRight } from 'lucide-react';

interface SidebarLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
    to,
    icon,
    label,
    isCollapsed,
    setCollapsed
}) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center py-3 px-4 rounded-lg mb-1 transition-all duration-200 ${isActive
                ? 'bg-cyan-700 text-white'
                : 'text-gray-300 hover:bg-cyan-800/50 hover:text-white'
                }`}
            onClick={() => {
                if (isCollapsed && setCollapsed) {
                    setCollapsed(false);
                }
            }}
        >
            <span className="flex items-center justify-center w-6 h-6">
                {icon}
            </span>
            {!isCollapsed && (
                <span className="ml-3 font-medium">{label}</span>
            )}
        </Link>
    );
};

const Sidebar: React.FC = () => {
    const [isCollapsed, setCollapsed] = useState(window.innerWidth < 500);

    return (
        <>
            {/* Mobile overlay when sidebar is open */}
            {!isCollapsed && (
                <>
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-20"
                        onClick={() => setCollapsed(true)}
                    />

                    <aside
                        className={`fixed md:sticky top-0 h-screen bg-cyan-700 text-white z-30 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'
                            }`}
                    >
                        <div className="flex items-center justify-between h-16 px-4 border-b border-cyan-800">
                            {/* {!isCollapsed && ( */}
                            <h1 className="text-xl font-bold">Admin Panel</h1>
                            {/* )} */}
                            <button
                                onClick={() => setCollapsed(!isCollapsed)}
                                className="p-2 rounded-lg hover:bg-cyan-900 transition-colors"
                            >
                                {/* {isCollapsed ? <ChevronRight size={20} /> : <X size={20} />} */}
                            </button>
                        </div>

                        <div className="flex-1 py-6 px-2 overflow-y-auto">
                            <SidebarLink
                                to="/"
                                icon={<LayoutDashboard size={20} />}
                                label="Dashboard"
                                isCollapsed={isCollapsed}
                                setCollapsed={setCollapsed}
                            />
                            <SidebarLink
                                to="/user-requests"
                                icon={<Users size={20} />}
                                label="User Requests"
                                isCollapsed={isCollapsed}
                                setCollapsed={setCollapsed}
                            />
                        </div>

                        <div className="p-4 border-t border-cyan-900">
                            {/* {!isCollapsed && ( */}
                            <div className="text-sm text-cyan-300">
                                Admin Panel v1.0
                            </div>
                            {/* )} */}
                        </div>
                    </aside>
                </>
            )}

            {/* Mobile toggle button */}
            <button
                className="md:hidden fixed bottom-4 right-4 bg-cyan-500 text-white p-3 rounded-full shadow-lg z-10"
                onClick={() => setCollapsed(!isCollapsed)}
            >
                <Menu size={24} />
            </button>
        </>
    );
};

export default Sidebar;