import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productServices';
import { getAllOrders } from '../../services/orderServices';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardStatics from './DashboardStatics';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsRes, ordersRes] = await Promise.all([
                getAllProducts(),
                getAllOrders()
            ]);

            const productsList = productsRes.data?.products || productsRes.data || [];
            const ordersList = Array.isArray(ordersRes.data) ? ordersRes.data : [];

            setProducts(productsList);
            setOrders(ordersList);
            setLoading(false);
        } catch (err) {
            console.error("Dashboard Fetch Error:", err);
            setProducts([]);
            setOrders([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [adminUser, setAdminUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = token.split(".")[1];
                const decoded = JSON.parse(atob(payload));
                setAdminUser(decoded);
            } catch (e) {
                console.error("Token Decode Error:", e);
            }
        }
    }, []);

    const initials = (adminUser?.name || "Admin")
        .split(" ")
        .filter(Boolean)
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "A";

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                        <p className="text-gray-500">Welcome back, {adminUser?.name || 'Admin'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin/add"
                            className="flex items-center gap-2 px-5 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors"
                        >
                            <FiPlus /> Add New Car
                        </Link>
                        <div
                            className="w-10 h-10 bg-[#ff3d00] rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                            onClick={() => navigate('/profile')}
                        >
                            {initials}
                        </div>
                    </div>
                </div>

                <DashboardStatics totalCars={products.length} totalOrders={orders.length} />

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Recent Bookings</h2>
                        <Link to="/admin/orders" className="flex items-center gap-2 text-[#ff3d00] font-medium hover:underline">
                            View All <FiArrowRight />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                                        <th className="pb-4 font-medium">Order ID</th>
                                        <th className="pb-4 font-medium">Customer</th>
                                        <th className="pb-4 font-medium">Vehicle</th>
                                        <th className="pb-4 font-medium">Price</th>
                                        <th className="pb-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-4">
                                                <span className="font-mono text-sm text-gray-600">
                                                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                                    </p>
                                                    <p className="text-sm text-gray-400">{order.shippingAddress.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 text-sm text-gray-600">
                                                {order.items.map((item, i) => (
                                                    <span key={i}>{item.title}{i < order.items.length - 1 ? ', ' : ''}</span>
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
                                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No bookings found yet.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
