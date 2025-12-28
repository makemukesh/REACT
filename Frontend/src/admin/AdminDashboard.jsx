import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productServices';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import DashboardStatics from './DashboardStatics';
const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data.products || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin-page-container">
            <AdminHeader />
            <div className="admin-content">
                <h1>Dashboard Overview</h1>
                <DashboardStatics totalCars={products.length} />

                <div className="recent-activity-section">
                    <h2>Recent Inventory</h2>
                    {loading ? <p>Loading...</p> : (
                        <div className="recent-grid">
                            {products.slice(0, 6).map(car => (
                                <div key={car._id} className="recent-card">
                                    <div className="recent-card-img">
                                        <img src={car.image} alt={car.title} />
                                    </div>
                                    <div className="recent-info">
                                        <div className="recent-card-header">
                                            <h4>{car.title}</h4>
                                            <div className="recent-actions">
                                                <Link to={`/admin/edit/${car._id}`} className="mini-edit-btn">Edit</Link>
                                                <Link to={`/car/${car._id}`} className="mini-delete-btn">Delete</Link>
                                            </div>
                                        </div>
                                        <p className="recent-price">${car.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
