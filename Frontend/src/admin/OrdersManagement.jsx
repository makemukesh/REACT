import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrder, deleteOrder } from '../../services/orderServices';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiTrash2, FiClock } from 'react-icons/fi';

const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div className="admin-loading">Loading Bookings...</div>;

    return (
        <div className="orders-management-page">
            <div className="admin-page-header">
                <h1>Order Management</h1>
                <p>Track and manage all car bookings and customer requests.</p>
            </div>

            <div className="orders-container">
                {orders.length === 0 ? (
                    <div className="no-orders">
                        <FiPackage />
                        <p>No orders found in the system.</p>
                    </div>
                ) : (
                    <div className="orders-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Vehicle(s)</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="order-id">#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                                        <td className="customer-info">
                                            <strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong>
                                            <p>{order.shippingAddress.email}</p>
                                        </td>
                                        <td className="order-items">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="item-mini-preview">
                                                    <img src={item.image} alt={item.title} />
                                                    <span>{item.title} (x{item.quantity})</span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="order-price">${order.totalPrice.toLocaleString()}</td>
                                        <td>
                                            <div className="status-badge-wrapper">
                                                {getStatusIcon(order.status)}
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
                                            </div>
                                        </td>
                                        <td className="action-btns">
                                            <button className="btn-delete-order" onClick={() => handleDeleteOrder(order._id)}>
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersManagement;
