import React, { useState } from 'react';
import { createProduct } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
const AddCar = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(formData);
            alert("Car added successfully!");
            navigate('/admin/cars');
        } catch (err) {
            alert("Error adding car: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="admin-page-container">
            <AdminHeader />
            <div className="admin-content">
                <div className="form-container">
                    <h1>Add New Car</h1>
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
