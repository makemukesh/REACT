import React, { useState, useEffect } from 'react';
import { getProductById, updateProduct } from '../../services/productServices';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
        setSaving(true);
        try {
            await updateProduct(id, formData);
            alert("Car updated successfully!");
            navigate('/admin/cars');
        } catch (err) {
            alert("Error updating car: " + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
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

    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors bg-gray-50";
    const labelClass = "block text-sm font-medium text-gray-700 mb-2";

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Edit Vehicle</h1>
                        <p className="text-gray-500">Modify listing information for #{id.substring(0, 8).toUpperCase()}</p>
                    </div>
                    <div
                        className="w-10 h-10 bg-[#ff3d00] rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
                        onClick={() => navigate('/profile')}
                    >
                        {initials}
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-xl font-bold text-slate-800 mb-8">Technical Specifications</h2>

                            {/* Basic Information */}
                            <h3 className="text-sm font-semibold text-indigo-600 mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                <div>
                                    <label className={labelClass}>Vehicle Name</label>
                                    <input name="title" value={formData.title} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Price ($)</label>
                                    <input name="price" type="number" value={formData.price} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Image URL</label>
                                    <input name="image" value={formData.image} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Genre / Type</label>
                                    <input name="genre" value={formData.genre} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Brand</label>
                                    <select name="brand" value={formData.brand} onChange={handleChange} required className={inputClass}>
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

                            {/* Technical Specifications */}
                            <h3 className="text-sm font-semibold text-indigo-600 mb-4">Technical Specifications</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div>
                                    <label className={labelClass}>Current Stock</label>
                                    <input name="stock" type="number" value={formData.stock} onChange={handleChange} required className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Manufacturing Year</label>
                                    <input name="manufacturingYear" type="number" value={formData.manufacturingYear} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Transmission</label>
                                    <input name="transmission" value={formData.transmission} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Fuel Type</label>
                                    <input name="fuelType" value={formData.fuelType} onChange={handleChange} className={inputClass} />
                                </div>
                            </div>

                            {/* Performance & Dimensions */}
                            <h3 className="text-sm font-semibold text-indigo-600 mb-4">Performance & Dimensions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div>
                                    <label className={labelClass}>Ground Clearance</label>
                                    <input name="groundClearance" value={formData.groundClearance} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Boot Space</label>
                                    <input name="bootSpace" value={formData.bootSpace} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Torque</label>
                                    <input name="torque" value={formData.torque} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Power</label>
                                    <input name="power" value={formData.power} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Engine Capacity</label>
                                    <input name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Kilometers Done</label>
                                    <input name="kilometersDone" value={formData.kilometersDone} onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Exterior Color</label>
                                    <input name="exteriorColor" value={formData.exteriorColor} onChange={handleChange} className={inputClass} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <label className={labelClass}>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required className={`${inputClass} resize-none`} />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/cars')}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel Edits
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors disabled:opacity-70"
                                >
                                    {saving ? "Updating..." : "Update Listing"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditCar;
