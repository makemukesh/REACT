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
                fetchMyOrders(); // Refresh orders
            } catch (err) {
                alert(err.response?.data?.message || "Failed to cancel order");
            }
        }
    };

    const getStatusClass = (status) => {
        return status.toLowerCase();
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
        <div className="orders-loading-overlay">
            <div className="loader-pulse"></div>
            <p>Retrieving your bookings...</p>
        </div>
    );

    return (
        <div className="my-orders-page">
            <div className="orders-hero">
                <div className="hero-content">
                    <h1>My Bookings</h1>
                    <p>Track your luxury vehicle orders and delivery status in real-time.</p>
                </div>
            </div>

            <div className="orders-list-container">
                {orders.length === 0 ? (
                    <div className="empty-orders-state">
                        <div className="empty-visual">
                            <FiPackage />
                        </div>
                        <h2>No Bookings Found</h2>
                        <p>It looks like you haven't booked any luxury cars yet.</p>
                        <button onClick={() => navigate('/cars')} className="btn-browse-cars">
                            Browse Collection <FiArrowRight />
                        </button>
                    </div>
                ) : (
                    <div className="orders-grid-user">
                        {orders.map((order) => (
                            <div key={order._id} className="user-order-card">
                                <div className="order-card-header">
                                    <div className="header-left">
                                        <span className="order-date">
                                            <FiCalendar /> {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="order-id-tag">ID: #{order._id.substring(order._id.length - 6).toUpperCase()}</span>
                                    </div>
                                    <div className={`order-status-pill ${getStatusClass(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status === 'Cancelled' ? (
                                            order.cancelledBy === 'Admin' ? 'Admin Cancelled' : 'User Cancelled'
                                        ) : order.status}
                                    </div>
                                </div>

                                <div className="order-card-body">
                                    <div className="booked-items">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="booked-item-row">
                                                <div className="item-img-box">
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className="item-info">
                                                    <h4>{item.title}</h4>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <span className="item-price-tag">${item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="order-card-footer">
                                    <div className="footer-info">
                                        <label>Total Investment</label>
                                        <div className="total-amount">${order.totalPrice.toLocaleString()}</div>
                                    </div>
                                    <div className="payment-status">
                                        {order.status === 'Processing' && (
                                            <button onClick={() => handleCancelOrder(order._id)} className="btn-cancel-order">
                                                Cancel Booking
                                            </button>
                                        )}
                                        <span className="paid-badge">
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
