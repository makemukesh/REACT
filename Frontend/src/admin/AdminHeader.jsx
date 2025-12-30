import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../services/productServices';

const AdminHeader = () => {
    const navigate = useNavigate();
    const [carCount, setCarCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await getAllProducts();
                setCarCount(response.data.products?.length || response.data.length || 0);
            } catch (err) {
                console.error("Error fetching count:", err);
            }
        };
        fetchCount();
    }, []);

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

    const initials = React.useMemo(() => {
        if (!user?.name) return "A";
        return user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }, [user]);

    return (
        <div className="admin-header">
            <div className="admin-brand">
                <div className="admin-logo-icon">A</div>
                <div className="admin-logo-text">
                    <h2>Admin<span>Fleet</span></h2>
                    <p>Management Portal</p>
                </div>
            </div>

            <nav className="admin-nav">
                <Link to="/admin" className="admin-link">Dashboard</Link>
                <Link to="/admin/cars" className="admin-link">Inventory</Link>
                <Link to="/admin/add" className="admin-link">Add New</Link>
                <Link to="/admin/orders" className="admin-link">Bookings</Link>
            </nav>

            <div className="admin-actions-right">
                <button onClick={() => navigate('/')} className="site-btn">View Site</button>
                <div className="user-chip" onClick={() => navigate('/profile')}>
                    <div className="user-avatar">{initials}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
