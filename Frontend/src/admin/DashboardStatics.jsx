import React from 'react';
import '../components/Header.css';

const DashboardStatics = ({ totalCars }) => {
    return (
        <div className="dashboard-stats-container">
            <div className="stat-card">
                <h3>Total Cars</h3>
                <p className="stat-number">{totalCars}</p>
                <span className="stat-label">In Inventory</span>
            </div>
            <div className="stat-card">
                <h3>Active Listings</h3>
                <p className="stat-number">{totalCars}</p>
                <span className="stat-label">Live on Site</span>
            </div>
            <div className="stat-card">
                <h3>Total Views</h3>
                <p className="stat-number">1.2k</p>
                <span className="stat-label">This Month</span>
            </div>
        </div>
    );
};

export default DashboardStatics;
