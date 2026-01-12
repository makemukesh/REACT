import React, { useState, useEffect } from 'react';
import { getUserOrders, cancelOrder } from '../../services/orderServices';
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiXCircle, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyOrders = async () => {
        try {
            const response = await getUserOrders();
            setOrders(response.data);
        } catch (err) {
            console.error("Error fetching my orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                await cancelOrder(orderId);
                alert("Order cancelled successfully");
                fetchMyOrders();
            } catch (err) {
                alert(err.response?.data?.message || "Failed to cancel order");
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <FiClock />;
            case 'Shipped': return <FiTruck />;
            case 'Delivered': return <FiCheckCircle />;
            case 'Cancelled': return <FiXCircle />;
            default: return <FiPackage />;
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Retrieving your bookings...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">My Bookings</h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                    Track your luxury vehicle orders and delivery status in real-time.
                </p>
            </div>

            {/* Orders List */}
            <div className="max-w-5xl mx-auto py-12 px-6">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                        <FiPackage className="text-6xl text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Bookings Found</h2>
                        <p className="text-gray-500 mb-8">It looks like you haven't booked any luxury cars yet.</p>
                        <button
                            onClick={() => navigate('/cars')}
                            className="px-6 py-3 bg-[#ff3d00] text-white font-semibold rounded-xl hover:bg-[#e63600] transition-colors flex items-center gap-2 mx-auto"
                        >
                            Browse Collection <FiArrowRight />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                {/* Order Header */}
                                <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-2 text-sm text-gray-500">
                                            <FiCalendar /> {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-sm font-mono text-gray-400">
                                            ID: #{order._id.substring(order._id.length - 6).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusStyles(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status === 'Cancelled'
                                            ? (order.cancelledBy === 'Admin' ? 'Admin Cancelled' : 'User Cancelled')
                                            : order.status}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-slate-800 truncate">{item.title}</h4>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                            <span className="font-bold text-[#ff3d00]">${item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-gray-50">
                                    <div>
                                        <span className="text-sm text-gray-500 block">Total Investment</span>
                                        <span className="text-2xl font-bold text-slate-800">${order.totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {order.status === 'Processing' && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 font-medium transition-colors"
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                        <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                            <FiCheckCircle /> Payment Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
