import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productServices';
import AdminHeader from './AdminHeader';
import DashboardStatics from './DashboardStatics';
import '../components/Header.css';

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
                            {products.slice(0, 3).map(car => (
                                <div key={car._id} className="recent-card">
                                    <img src={car.image} alt={car.title} />
                                    <div className="recent-info">
                                        <h4>{car.title}</h4>
                                        <p>${car.price.toLocaleString()}</p>
                                        <span className={`status-badge ${car.stock > 0 ? 'available' : 'sold'}`}>
                                            {car.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
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
