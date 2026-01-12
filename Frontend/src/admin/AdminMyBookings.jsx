import React, { useState, useEffect } from 'react';
import { getUserOrders, cancelOrder } from '../../services/orderServices';
import { FiPackage, FiXCircle, FiArrowRight } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';

const AdminMyBookings = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyOrders = async () => {
        try {
            const response = await getUserOrders();
            setOrders(response.data);
        } catch (err) {
            console.error("Error fetching admin's personal orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel your booking?")) {
            try {
                await cancelOrder(orderId);
                fetchMyOrders();
            } catch (err) {
                alert("Failed to cancel booking");
            }
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const [adminUser, setAdminUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                setAdminUser(decoded);
            } catch (e) { }
        }
    }, []);

    const initials = (adminUser?.name || "Admin")
        .split(" ")
        .filter(Boolean)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "A";

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">My Personal Bookings</h1>
                        <p className="text-gray-500">Manage cars you have personally booked.</p>
                    </div>
                    <div
                        className="w-10 h-10 bg-[#ff3d00] rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                        onClick={() => navigate('/profile')}
                    >
                        {initials}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-16">
                            <FiPackage className="text-5xl text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-6">You haven't booked any cars yet.</p>
                            <button
                                onClick={() => navigate('/cars')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors"
                            >
                                Browse Cars <FiArrowRight />
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 font-medium">Order ID</th>
                                        <th className="pb-4 font-medium">Date</th>
                                        <th className="pb-4 font-medium">Vehicles</th>
                                        <th className="pb-4 font-medium">Total Price</th>
                                        <th className="pb-4 font-medium">Status</th>
                                        <th className="pb-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-4">
                                                <span className="font-mono text-sm text-gray-600">
                                                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-4 text-slate-800">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-sm text-gray-600">
                                                {order.items.map((item, idx) => (
                                                    <span key={idx}>{item.title}{idx < order.items.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </td>
                                            <td className="py-4 font-semibold text-slate-800">
                                                ${order.totalPrice.toLocaleString()}
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    {order.status === 'Processing' && (
                                                        <button
                                                            className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                            onClick={() => handleCancelOrder(order._id)}
                                                            title="Cancel Booking"
                                                        >
                                                            <FiXCircle className="text-sm" />
                                                        </button>
                                                    )}
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                                        onClick={() => navigate('/my-bookings')}
                                                        title="View Full Receipt"
                                                    >
                                                        <FiArrowRight className="text-sm" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminMyBookings;
