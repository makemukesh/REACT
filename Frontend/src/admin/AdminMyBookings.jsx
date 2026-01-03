import React, { useState, useEffect } from 'react';
import { getUserOrders, cancelOrder } from '../../services/orderServices';
import { FiCalendar, FiPackage, FiCheckCircle, FiClock, FiTruck, FiXCircle } from 'react-icons/fi';
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
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <div className="admin-top-bar">
                    <div className="top-bar-left">
                        <h1>My Personal Bookings</h1>
                        <p className="subtitle">Manage cars you have personally booked.</p>
                    </div>
                    <div className="top-bar-right">
                        <div className="user-chip" onClick={() => navigate('/profile')}>
                            <div className="user-avatar">{initials}</div>
                        </div>
                    </div>
                </div>

                <div className="recent-activity-section">
                    {loading ? (
                        <div className="loading-spinner">Loading your bookings...</div>
                    ) : orders.length === 0 ? (
                        <div className="no-data" style={{ textAlign: 'center', padding: '50px' }}>
                            <FiPackage size={50} style={{ opacity: 0.2, marginBottom: '20px' }} />
                            <p>You haven't booked any cars yet.</p>
                            <button onClick={() => navigate('/cars')} className="btn-add-car-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                                Browse Cars
                            </button>
                        </div>
                    ) : (
                        <div className="inventory-rows">
                            <div className="rows-header">
                                <span>Order ID</span>
                                <span>Date</span>
                                <span>Vehicles</span>
                                <span>Total Price</span>
                                <span>Status</span>
                                <span>Actions</span>
                            </div>
                            {orders.map((order) => (
                                <div key={order._id} className="inventory-row">
                                    <div className="row-name">
                                        <span className="order-id-short">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                    </div>
                                    <div className="row-name">
                                        <h4>{new Date(order.createdAt).toLocaleDateString()}</h4>
                                    </div>
                                    <div className="row-items-preview">
                                        {order.items.map((item, idx) => (
                                            <span key={idx}>{item.title}{idx < order.items.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </div>
                                    <div className="row-price">${order.totalPrice.toLocaleString()}</div>
                                    <div className="row-stock">
                                        <span className={`status-pill ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="row-actions">
                                        {order.status === 'Processing' && (
                                            <button
                                                className="row-btn delete"
                                                onClick={() => handleCancelOrder(order._id)}
                                                title="Cancel Booking"
                                            >
                                                <FiXCircle />
                                            </button>
                                        )}
                                        <button className="row-btn edit" onClick={() => navigate('/my-bookings')} title="View Full Receipt">
                                            <FiCheckCircle />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminMyBookings;
