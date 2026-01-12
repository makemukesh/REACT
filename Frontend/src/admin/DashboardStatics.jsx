import React from 'react';
import { FiBox, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';

const DashboardStatics = ({ totalCars, totalOrders }) => {
    const stats = [
        {
            title: "Total Cars",
            value: totalCars || 0,
            label: "In Inventory",
            icon: <FiBox />,
            bgColor: "bg-indigo-50",
            iconColor: "text-indigo-600"
        },
        {
            title: "Total Bookings",
            value: totalOrders || 0,
            label: "All Time Orders",
            icon: <FiShoppingBag />,
            bgColor: "bg-emerald-50",
            iconColor: "text-emerald-600"
        },
        {
            title: "Active Listings",
            value: totalCars || 0,
            label: "Live on Site",
            icon: <FiTrendingUp />,
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600"
        },
        {
            title: "Performance",
            value: "98%",
            label: "Satisfaction",
            icon: <FiUsers />,
            bgColor: "bg-red-50",
            iconColor: "text-red-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.iconColor} text-xl`}>
                            {stat.icon}
                        </div>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            ↑ 12%
                        </span>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                        <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStatics;
