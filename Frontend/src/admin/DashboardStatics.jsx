import React from 'react';
const DashboardStatics = ({ totalCars, totalOrders }) => {
    return (
        <div className="dashboard-stats-container">
            <div className="stat-card">
                <h3>Total Cars</h3>
                <p className="stat-number">{totalCars}</p>
                <span className="stat-label">In Inventory</span>
            </div>
            <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-number">{totalOrders || 0}</p>
                <span className="stat-label">Customer Orders</span>
            </div>
        </div>
    );
};

export default DashboardStatics;
