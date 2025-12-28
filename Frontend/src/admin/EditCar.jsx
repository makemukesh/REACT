import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/productServices';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from './AdminHeader';
const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        genre: '',
        stock: ''
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await getProductById(id);
                // Ensure we handle both response structures just in case
                const product = response.data.product || response.data;
                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    genre: product.genre,
                    stock: product.stock
                });
                setLoading(false);
            } catch (err) {
                alert("Error fetching car details");
                navigate('/admin/cars');
            }
        };
        fetchCar();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, formData);
            alert("Car updated successfully!");
            navigate('/admin/cars');
        } catch (err) {
            alert("Error updating car: " + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-page-container">
            <AdminHeader />
            <div className="admin-content">
                <div className="form-container">
                    <h1>Edit Car</h1>
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
                            <input name="genre" value={formData.genre} onChange={handleChange} required />
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
                            <button type="submit" className="btn-submit">Update Car</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCar;
