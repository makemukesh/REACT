import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Header.css';

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="admin-header">
            <div className="admin-logo">
                <h2>Admin<span>Panel</span></h2>
            </div>
            <nav className="admin-nav">
                <Link to="/admin" className="admin-link">Dashboard</Link>
                <Link to="/admin/cars" className="admin-link">Manage Cars</Link>
                <Link to="/admin/add" className="admin-link">Add Car</Link>
            </nav>
            <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>
    );
};

export default AdminHeader;
