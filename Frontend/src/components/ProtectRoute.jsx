import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const location = useLocation();

    if (!token) {
        // Redirect to login if not authenticated (or home/login modal trigger)
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (adminOnly && user.role !== 'admin') {
        // Redirect to home if user is not admin
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectRoute;
