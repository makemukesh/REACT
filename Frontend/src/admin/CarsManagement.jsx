import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productServices';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const CarsManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts();
            setProducts(response.data.products || response.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                alert("Failed to delete product");
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

    const initials = adminUser?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "A";

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <div className="admin-top-bar">
                    <div className="top-bar-left">
                        <h1>Inventory Management</h1>
                        <p className="subtitle">Manage and monitor your vehicle stock</p>
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

                {loading ? (
                    <div className="loading-spinner">Loading inventory...</div>
                ) : (
                    <div className="recent-activity-section">
                        <div className="inventory-rows">
                            <div className="rows-header">
                                <span>Image</span>
                                <span>Car Name</span>
                                <span>Price</span>
                                <span>Stock</span>
                                <span>Actions</span>
                            </div>
                            {products.map(product => (
                                <div key={product._id} className="inventory-row">
                                    <div className="row-img">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <div className="row-name">
                                        <h4>{product.title}</h4>
                                        <p>{product.genre}</p>
                                    </div>
                                    <div className="row-price">
                                        ${product.price.toLocaleString()}
                                    </div>
                                    <div className="row-stock">
                                        <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                                        </span>
                                    </div>
                                    <div className="row-actions">
                                        <Link to={`/admin/edit/${product._id}`} className="row-btn edit">Edit</Link>
                                        <Link to={`/car/${product._id}`} className="row-btn view">Detail</Link>
                                        <button onClick={() => handleDelete(product._id)} className="row-btn delete">Delete</button>
                                    </div>
                                </div>
                            ))}
                            {products.length === 0 && <p className="no-data">No cars found in inventory.</p>}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CarsManagement;
