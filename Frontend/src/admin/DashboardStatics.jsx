import React from 'react';
const DashboardStatics = ({ totalCars }) => {
    return (
        <div className="dashboard-stats-container">
            <div className="stat-card">
                <h3>Total Cars</h3>
                <p className="stat-number">{totalCars}</p>
                <span className="stat-label">In Inventory</span>
            </div>
        </div>
    );
};

export default DashboardStatics;
