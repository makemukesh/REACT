import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, bulkCreateProducts } from '../../services/productServices';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import DashboardStatics from './DashboardStatics';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            setProducts(response.data.products || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await deleteProduct(id);
                alert("Car deleted successfully");
                fetchData();
            } catch (err) {
                console.error("Error deleting car:", err);
                alert("Failed to delete car");
            }
        }
    };

    return (
        <div className="admin-page-container">
            <AdminHeader refreshTrigger={fetchData} />
            <div className="admin-content">
                <div className="dashboard-header-flex">
                    <div className="header-left">
                        <h1>Dashboard Overview</h1>
                        <p className="subtitle">Manage your inventory and site performance</p>
                    </div>
                    <div className="header-actions">
                        <Link to="/admin/add" className="btn-add-car-primary">
                            ➕ Add New Car
                        </Link>
                    </div>
                </div>

                <DashboardStatics totalCars={products.length} />

                <div className="recent-activity-section">
                    <div className="section-header-flex">
                        <h2>Recent Inventory</h2>
                        <Link to="/admin/cars" className="view-all-link">View All Inventory</Link>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">Loading inventory...</div>
                    ) : (
                        <div className="inventory-rows">
                            <div className="rows-header">
                                <span>Image</span>
                                <span>Car Name</span>
                                <span>Price</span>
                                <span>Stock</span>
                                <span>Actions</span>
                            </div>
                            {products.slice(0, 6).map(car => (
                                <div key={car._id} className="inventory-row">
                                    <div className="row-img">
                                        <img src={car.image} alt={car.title} />
                                    </div>
                                    <div className="row-name">
                                        <h4>{car.title}</h4>
                                        <p>{car.genre}</p>
                                    </div>
                                    <div className="row-price">
                                        ${car.price.toLocaleString()}
                                    </div>
                                    <div className="row-stock">
                                        <span className={`stock-badge ${car.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                            {car.stock > 0 ? `${car.stock} in stock` : 'Out of Stock'}
                                        </span>
                                    </div>
                                    <div className="row-actions">
                                        <Link to={`/admin/edit/${car._id}`} className="row-btn edit">Edit</Link>
                                        <Link to={`/car/${car._id}`} className="row-btn view">Detail</Link>
                                        <button onClick={() => handleDelete(car._id)} className="row-btn delete">Delete</button>
                                    </div>
                                </div>
                            ))}
                            {products.length === 0 && <p className="no-data">No cars found in inventory.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
