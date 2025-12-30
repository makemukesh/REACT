import React, { useState } from 'react';
import { createProduct, bulkCreateProducts } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';

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

            // Show a preview/summary before importing
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

    return (
        <div className="admin-page-container">
            <AdminHeader />
            <div className="admin-content">
                <div className="form-container">
                    <div className="form-header-flex">
                        <h1>Add New Car</h1>
                        <div className="bulk-import-container">
                            <div className="import-wrapper">
                                <label htmlFor="json-upload-add" className={`bulk-import-btn ${loading ? 'loading' : ''}`}>
                                    {loading ? "⌛ Processing..." : "📤 Bulk Import JSON"}
                                </label>
                                <p className="import-help">Must be an array of car objects</p>
                            </div>
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
                        <div className="form-group">
                            <label>Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input name="image" value={formData.image} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Genre (Type)</label>
                            <input name="genre" value={formData.genre} onChange={handleChange} placeholder="e.g. SUV, Sedan" required />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                        </div>
                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => navigate('/admin/cars')} className="btn-cancel">Cancel</button>
                            <button type="submit" className="btn-submit">Add Car</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCar;
