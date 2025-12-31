import React, { useState, useEffect } from 'react';
import { createProduct, bulkCreateProducts } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AddCar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        genre: '',
        stock: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            let cars = [];
            try {
                const jsonData = JSON.parse(event.target.result);
                cars = Array.isArray(jsonData) ? jsonData : [jsonData];
            } catch (parseError) {
                console.error("JSON Parsing Error:", parseError);
                alert("Invalid JSON file. Please check for syntax errors or extra characters at the end of the file.");
                e.target.value = '';
                return;
            }

            const confirmMsg = `Found ${cars.length} car(s).\nFormat Example: { "title": "BMW X5", "price": 50000, ... }\n\nContinue with import?`;

            if (window.confirm(confirmMsg)) {
                setLoading(true);
                try {
                    const response = await bulkCreateProducts(cars);
                    alert(response.data.message || "Cars imported successfully!");
                    navigate('/admin/cars');
                } catch (apiError) {
                    console.error("API Error during bulk import:", apiError);
                    alert("Server Error: " + (apiError.response?.data?.message || apiError.message));
                } finally {
                    setLoading(false);
                    e.target.value = '';
                }
            } else {
                e.target.value = '';
            }
        };
        reader.readAsText(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createProduct(formData);
            alert("Car added successfully!");
            navigate('/admin/cars');
        } catch (err) {
            alert("Error adding car: " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
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
                        <h1>Add New Listing</h1>
                        <p className="subtitle">Expand your premium vehicle inventory</p>
                    </div>
                    <div className="top-bar-right">
                        <div className="user-chip" onClick={() => navigate('/profile')}>
                            <div className="user-avatar">{initials}</div>
                        </div>
                    </div>
                </div>

                <div className="recent-activity-section">
                    <div className="form-container">
                        <div className="form-header-flex">
                            <h2>Vehicle Details</h2>
                            <div className="bulk-import-container">
                                <label htmlFor="json-upload-add" className={`bulk-import-btn ${loading ? 'loading' : ''}`} style={{ cursor: 'pointer' }}>
                                    {loading ? "⌛ Processing..." : "📤 Bulk Import JSON"}
                                </label>
                                <input
                                    id="json-upload-add"
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group-grid">
                                <div className="form-group">
                                    <label>Vehicle Name</label>
                                    <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Mercedes-Benz G-Class" required />
                                </div>
                                <div className="form-group">
                                    <label>Base Price ($)</label>
                                    <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Display Image URL</label>
                                    <input name="image" value={formData.image} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Genre / Category</label>
                                    <input name="genre" value={formData.genre} onChange={handleChange} placeholder="SUV, Luxury, etc." required />
                                </div>
                                <div className="form-group">
                                    <label>Inventory Stock</label>
                                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group full-width" style={{ marginTop: '20px' }}>
                                <label>Detailed Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required />
                            </div>
                            <div className="form-actions" style={{ marginTop: '30px' }}>
                                <button type="button" onClick={() => navigate('/admin/cars')} className="btn-cancel">Discard</button>
                                <button type="submit" className="btn-submit" disabled={loading}>
                                    {loading ? "Adding..." : "Launch Listing"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddCar;
