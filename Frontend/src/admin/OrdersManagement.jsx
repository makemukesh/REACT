import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrder, deleteOrder } from '../../services/orderServices';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiTrash2, FiClock } from 'react-icons/fi';
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
            fetchOrders(); // Refresh list
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

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <FiClock className="status-icon processing" />;
            case 'Shipped': return <FiTruck className="status-icon shipped" />;
            case 'Delivered': return <FiCheckCircle className="status-icon delivered" />;
            case 'Cancelled': return <FiXCircle className="status-icon cancelled" />;
            default: return <FiClock />;
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
                        <h1>Booking Management</h1>
                        <p className="subtitle">Track and manage all car bookings and customer requests.</p>
                    </div>
                    <div className="top-bar-right">
                        <div className="user-chip" onClick={() => navigate('/profile')}>
                            <div className="user-avatar">{initials}</div>
                        </div>
                    </div>
                </div>

                <div className="recent-activity-section">
                    {loading ? (
                        <div className="loading-spinner">Loading Bookings...</div>
                    ) : orders.length === 0 ? (
                        <div className="no-orders">
                            <FiPackage />
                            <p>No orders found in the system.</p>
                        </div>
                    ) : (
                        <div className="inventory-rows">
                            <div className="rows-header order-rows-header">
                                <span>Order ID</span>
                                <span>Customer</span>
                                <span>Vehicle(s)</span>
                                <span>Total Price</span>
                                <span>Status</span>
                                <span>Actions</span>
                            </div>
                            {orders.map((order) => (
                                <div key={order._id} className="inventory-row order-inventory-row">
                                    <div className="row-name">
                                        <span className="order-id-short">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                    </div>
                                    <div className="row-name">
                                        <h4>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</h4>
                                        <p>{order.shippingAddress.email}</p>
                                    </div>
                                    <div className="row-items-preview">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="item-mini-preview" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span>{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row-price">${order.totalPrice.toLocaleString()}</div>
                                    <div className="row-stock">
                                        <div className="status-badge-wrapper">
                                            {order.status === 'Cancelled' ? (
                                                <div className={`cancelled-by-tag ${order.cancelledBy?.toLowerCase()}`}>
                                                    {order.cancelledBy === 'User' ? 'User Cancelled' : 'Admin Cancelled'}
                                                </div>
                                            ) : (
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                    className={`status-select ${order.status.toLowerCase()}`}
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row-actions">
                                        <button className="row-btn delete" onClick={() => handleDeleteOrder(order._id)}>
                                            <FiTrash2 />
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

export default OrdersManagement;
