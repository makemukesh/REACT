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
        { path: '/admin/orders', icon: <FiShoppingBag />, label: 'Bookings' },
    ];

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
                <div className="admin-brand">
                    <div className="admin-logo-icon">A</div>
                    <div className="admin-logo-text">
                        <h2>Admin<span>Fleet</span></h2>
                        <p>Management Portal</p>
                    </div>
                </div>
            </div>

            <nav className="admin-sidebar-nav">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`admin-sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="admin-sidebar-footer">
                <button onClick={() => navigate('/')} className="admin-sidebar-link" style={{ border: 'none', background: 'none', width: '100%', marginBottom: '10px' }}>
                    <FiExternalLink />
                    <span>View Site</span>
                </button>
                <button onClick={handleLogout} className="btn-sidebar-logout">
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
