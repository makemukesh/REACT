import React from 'react';
import { FiBox, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';

const DashboardStatics = ({ totalCars, totalOrders }) => {
    const stats = [
        {
            title: "Total Cars",
            value: totalCars || 0,
            label: "In Inventory",
            icon: <FiBox />,
            color: "#4f46e5"
        },
        {
            title: "Total Bookings",
            value: totalOrders || 0,
            label: "All Time Orders",
            icon: <FiShoppingBag />,
            color: "#10b981"
        },
        {
            title: "Active Listings",
            value: totalCars || 0, // Assuming all are active for now
            label: "Live on Site",
            icon: <FiTrendingUp />,
            color: "#f59e0b"
        },
        {
            title: "Performance",
            value: "98%",
            label: "Satisfaction",
            icon: <FiUsers />,
            color: "#ef4444"
        }
    ];

    return (
        <div className="dashboard-stats-grid">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card-premium">
                    <div className="stat-card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                        {stat.icon}
                    </div>
                    <div className="stat-card-info">
                        <h3>{stat.title}</h3>
                        <div className="stat-value-group">
                            <span className="stat-number">{stat.value}</span>
                            <span className="stat-trend">↑ 12%</span>
                        </div>
                        <p className="stat-label">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStatics;
