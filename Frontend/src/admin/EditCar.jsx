import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/productServices';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

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
        brand: '',
        stock: '',
        manufacturingYear: '',
        transmission: '',
        fuelType: '',
        groundClearance: '',
        bootSpace: '',
        torque: '',
        power: '',
        engineCapacity: '',
        kilometersDone: '',
        exteriorColor: ''
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await getProductById(id);
                const product = response.data.product || response.data;
                setFormData({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    genre: product.genre,
                    brand: product.brand || '',
                    stock: product.stock,
                    manufacturingYear: product.manufacturingYear || '',
                    transmission: product.transmission || '',
                    fuelType: product.fuelType || '',
                    groundClearance: product.groundClearance || '',
                    bootSpace: product.bootSpace || '',
                    torque: product.torque || '',
                    power: product.power || '',
                    engineCapacity: product.engineCapacity || '',
                    kilometersDone: product.kilometersDone || '',
                    exteriorColor: product.exteriorColor || ''
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
                        <h1>Edit Vehicle</h1>
                        <p className="subtitle">Modify listing information for #{id.substring(0, 8).toUpperCase()}</p>
                    </div>
                    <div className="top-bar-right">
                        <div className="user-chip" onClick={() => navigate('/profile')}>
                            <div className="user-avatar">{initials}</div>
                        </div>
                    </div>
                </div>

                <div className="recent-activity-section">
                    {loading ? (
                        <div className="loading-spinner">Loading vehicle data...</div>
                    ) : (
                        <div className="form-container">
                            <h2>Technical Specifications</h2>
                            <form onSubmit={handleSubmit} className="admin-form">
                                <h3 className="form-sub-title" style={{ marginBottom: '20px', color: '#6366f1', fontSize: '1rem' }}>Basic Information</h3>
                                <div className="form-group-grid">
                                    <div className="form-group">
                                        <label>Vehicle Name</label>
                                        <input name="title" value={formData.title} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Price ($)</label>
                                        <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input name="image" value={formData.image} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Genre / Type</label>
                                        <input name="genre" value={formData.genre} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <select name="brand" value={formData.brand} onChange={handleChange} required>
                                            <option value="">Select Brand</option>
                                            <option value="BMW">BMW</option>
                                            <option value="Mercedes">Mercedes</option>
                                            <option value="Audi">Audi</option>
                                            <option value="Bentley">Bentley</option>
                                            <option value="Porsche">Porsche</option>
                                            <option value="Ferrari">Ferrari</option>
                                            <option value="Lamborghini">Lamborghini</option>
                                            <option value="Rolls Royce">Rolls Royce</option>
                                        </select>
                                    </div>
                                </div>

                                <h3 className="form-sub-title" style={{ marginTop: '30px', marginBottom: '20px', color: '#6366f1', fontSize: '1rem' }}>Technical Specifications</h3>
                                <div className="form-group-grid">
                                    <div className="form-group">
                                        <label>Current Stock</label>
                                        <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Manufacturing Year</label>
                                        <input name="manufacturingYear" type="number" value={formData.manufacturingYear} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Transmission</label>
                                        <input name="transmission" value={formData.transmission} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Fuel Type</label>
                                        <input name="fuelType" value={formData.fuelType} onChange={handleChange} />
                                    </div>
                                </div>

                                <h3 className="form-sub-title" style={{ marginTop: '30px', marginBottom: '20px', color: '#6366f1', fontSize: '1rem' }}>Performance & Dimensions</h3>
                                <div className="form-group-grid">
                                    <div className="form-group">
                                        <label>Ground Clearance</label>
                                        <input name="groundClearance" value={formData.groundClearance} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Boot Space</label>
                                        <input name="bootSpace" value={formData.bootSpace} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Torque</label>
                                        <input name="torque" value={formData.torque} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Power</label>
                                        <input name="power" value={formData.power} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Engine Capacity</label>
                                        <input name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Kilometers Done</label>
                                        <input name="kilometersDone" value={formData.kilometersDone} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Exterior Color</label>
                                        <input name="exteriorColor" value={formData.exteriorColor} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-group full-width" style={{ marginTop: '20px' }}>
                                    <label>Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required />
                                </div>
                                <div className="form-actions" style={{ marginTop: '30px' }}>
                                    <button type="button" onClick={() => navigate('/admin/cars')} className="btn-cancel">Cancel Edits</button>
                                    <button type="submit" className="btn-submit">Update Listing</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditCar;
