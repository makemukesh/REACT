import React, { useState, useEffect } from 'react';
import { createProduct, bulkCreateProducts } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FiUpload } from 'react-icons/fi';

const AddCar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
                alert("Invalid JSON file. Please check for syntax errors.");
                e.target.value = '';
                return;
            }

            const confirmMsg = `Found ${cars.length} car(s). Continue with import?`;

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

    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors bg-gray-50";
    const labelClass = "block text-sm font-medium text-gray-700 mb-2";

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Add New Listing</h1>
                        <p className="text-gray-500">Expand your premium vehicle inventory</p>
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
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-800">Vehicle Details</h2>
                        <label
                            htmlFor="json-upload-add"
                            className={`flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors ${loading ? 'opacity-50' : ''}`}
                        >
                            <FiUpload /> {loading ? "Processing..." : "Bulk Import JSON"}
                        </label>
                        <input
                            id="json-upload-add"
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={loading}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <h3 className="text-sm font-semibold text-indigo-600 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            <div>
                                <label className={labelClass}>Vehicle Name</label>
                                <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Mercedes-Benz G-Class" required className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Base Price ($)</label>
                                <input name="price" type="number" value={formData.price} onChange={handleChange} required className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Display Image URL</label>
                                <input name="image" value={formData.image} onChange={handleChange} required className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Genre / Category</label>
                                <input name="genre" value={formData.genre} onChange={handleChange} placeholder="SUV, Luxury, etc." required className={inputClass} />
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
                                <label className={labelClass}>Inventory Stock</label>
                                <input name="stock" type="number" value={formData.stock} onChange={handleChange} required className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Manufacturing Year</label>
                                <input name="manufacturingYear" type="number" value={formData.manufacturingYear} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Transmission</label>
                                <input name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Automatic / Manual" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Fuel Type</label>
                                <input name="fuelType" value={formData.fuelType} onChange={handleChange} placeholder="Petrol / Diesel / Electric" className={inputClass} />
                            </div>
                        </div>

                        {/* Performance & Dimensions */}
                        <h3 className="text-sm font-semibold text-indigo-600 mb-4">Performance & Dimensions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div>
                                <label className={labelClass}>Ground Clearance</label>
                                <input name="groundClearance" value={formData.groundClearance} onChange={handleChange} placeholder="e.g. 140 mm" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Boot Space</label>
                                <input name="bootSpace" value={formData.bootSpace} onChange={handleChange} placeholder="e.g. 490 L" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Torque</label>
                                <input name="torque" value={formData.torque} onChange={handleChange} placeholder="e.g. 450 Nm" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Power</label>
                                <input name="power" value={formData.power} onChange={handleChange} placeholder="e.g. 300 hp" className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Engine Capacity</label>
                                <input name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} placeholder="e.g. 3.0 L" className={inputClass} />
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
                            <label className={labelClass}>Detailed Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required className={`${inputClass} resize-none`} />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/cars')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-[#ff3d00] text-white font-medium rounded-xl hover:bg-[#e63600] transition-colors disabled:opacity-70"
                            >
                                {loading ? "Adding..." : "Launch Listing"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddCar;
