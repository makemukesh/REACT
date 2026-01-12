import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiBox, FiPlusSquare, FiShoppingBag, FiUser, FiLogOut, FiExternalLink } from 'react-icons/fi';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const decodeToken = (token) => {
            try {
                const payload = token.split(".")[1];
                const decoded = JSON.parse(atob(payload));
                return decoded;
            } catch (e) {
                return null;
            }
        };

        const token = localStorage.getItem("token");
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setUser({
                    name: decoded.name || "Admin",
                    role: decoded.role
                });
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/');
        window.location.reload();
    };

    const navLinks = [
        { path: '/admin', icon: <FiGrid />, label: 'Dashboard' },
        { path: '/admin/cars', icon: <FiBox />, label: 'Inventory' },
        { path: '/admin/add', icon: <FiPlusSquare />, label: 'Add New Car' },
        { path: '/admin/orders', icon: <FiShoppingBag />, label: 'All Bookings' },
        { path: '/admin/my-bookings', icon: <FiUser />, label: 'My Bookings' },
    ];

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col sticky top-0">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#ff3d00] rounded-xl flex items-center justify-center font-bold text-lg">
                        A
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Admin<span className="text-[#ff3d00]">Fleet</span></h2>
                        <p className="text-xs text-slate-400">Management Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4">
                <ul className="space-y-2">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path
                                        ? 'bg-[#ff3d00] text-white'
                                        : 'text-slate-300 hover:bg-slate-800'
                                    }`}
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 space-y-2">
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-colors"
                >
                    <FiExternalLink className="text-lg" />
                    <span>View Site</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
