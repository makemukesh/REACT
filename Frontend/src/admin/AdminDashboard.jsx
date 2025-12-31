import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productServices';
import { getAllOrders } from '../../services/orderServices';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardStatics from './DashboardStatics';
import { FiUser } from 'react-icons/fi';

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
            setProducts(productsRes.data.products || productsRes.data || []);
            setOrders(ordersRes.data || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
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
                const decoded = JSON.parse(atob(token.split(".")[1]));
                setAdminUser(decoded);
            } catch (e) { }
        }
    }, []);

    const initials = adminUser?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "A";

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <div className="admin-top-bar">
                    <div className="top-bar-left">
                        <h1>Dashboard Overview</h1>
                        <p className="subtitle">Welcome back, {adminUser?.name || 'Admin'}</p>
                    </div>
                    <div className="top-bar-right">
                        <Link to="/admin/add" className="btn-add-car-primary">
                            ➕ Add New Car
                        </Link>
                        <div className="user-chip" onClick={() => navigate('/profile')}>
                            <div className="user-avatar">{initials}</div>
                        </div>
                    </div>
                </div>

                <DashboardStatics totalCars={products.length} totalOrders={orders.length} />

                <div className="recent-activity-section">
                    <div className="section-header-flex">
                        <h2>Recent Bookings</h2>
                        <Link to="/admin/orders" className="view-all-link">View All Bookings</Link>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">Loading bookings...</div>
                    ) : (
                        <div className="inventory-rows">
                            <div className="rows-header">
                                <span>Order ID</span>
                                <span>Customer</span>
                                <span>Vehicle</span>
                                <span>Price</span>
                                <span>Status</span>
                            </div>
                            {orders.slice(0, 5).map(order => (
                                <div key={order._id} className="inventory-row">
                                    <div className="row-name">
                                        <span className="order-id-short">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                    </div>
                                    <div className="row-name">
                                        <h4>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</h4>
                                        <p>{order.shippingAddress.email}</p>
                                    </div>
                                    <div className="row-items-preview">
                                        {order.items.map((item, i) => (
                                            <span key={i}>{item.title}{i < order.items.length - 1 ? ', ' : ''}</span>
                                        ))}
                                    </div>
                                    <div className="row-price">
                                        ${order.totalPrice.toLocaleString()}
                                    </div>
                                    <div className="row-stock">
                                        {order.status === 'Cancelled' ? (
                                            <div className={`cancelled-by-tag ${order.cancelledBy?.toLowerCase()}`}>
                                                {order.cancelledBy === 'User' ? 'User Cancelled' : 'Admin Cancelled'}
                                            </div>
                                        ) : (
                                            <span className={`status-pill ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && <p className="no-data">No bookings found yet.</p>}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
