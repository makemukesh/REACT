import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrder, deleteOrder } from '../../services/orderServices';
import { FiPackage, FiTrash2 } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';

const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getAllOrders();
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders.");
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateOrder(id, newStatus);
            fetchOrders();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder(id);
                fetchOrders();
            } catch (err) {
                alert("Failed to delete order");
            }
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
                        <h1 className="text-2xl font-bold text-slate-800">Booking Management</h1>
                        <p className="text-gray-500">Track and manage all car bookings and customer requests.</p>
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
                            <p className="text-gray-500">No orders found in the system.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 font-medium">Order ID</th>
                                        <th className="pb-4 font-medium">Customer</th>
                                        <th className="pb-4 font-medium">Vehicle(s)</th>
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
                                            <td className="py-4">
                                                <p className="font-medium text-slate-800">
                                                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                                </p>
                                                <p className="text-sm text-gray-400">{order.shippingAddress.email}</p>
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
                                                {order.status === 'Cancelled' ? (
                                                    <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                                                        {order.cancelledBy === 'User' ? 'User Cancelled' : 'Admin Cancelled'}
                                                    </span>
                                                ) : (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                        className={`px-3 py-2 text-xs font-medium rounded-lg border cursor-pointer focus:outline-none ${getStatusStyles(order.status)}`}
                                                    >
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                )}
                                            </td>
                                            <td className="py-4">
                                                <button
                                                    className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                >
                                                    <FiTrash2 className="text-sm" />
                                                </button>
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

export default OrdersManagement;
