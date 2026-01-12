import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productServices';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import {
    MdCalendarMonth, MdRoute, MdSettings, MdLocalGasStation,
    MdPalette, MdOutlineHeight, MdWorkOutline,
    MdSpeed, MdBolt, MdDirectionsCar
} from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';
import { deleteProduct } from '../../services/productServices';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await getProductById(id);
                setCar(response.data.product || response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError("Failed to load car details.");
                setLoading(false);
            }
        };

        if (id) {
            fetchCar();
        }
    }, [id]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser(payload);
            } catch (e) {
                console.error("Error decoding token", e);
            }
        }
    }, []);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this car? This action cannot be undone.")) {
            try {
                await deleteProduct(car._id);
                alert("Car deleted successfully");
                navigate("/admin");
            } catch (err) {
                console.error("Error deleting car:", err);
                alert("Failed to delete car");
            }
        }
    };

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to add products to cart.");
            return;
        }

        dispatch(
            addToCart({
                _id: car._id,
                title: car.title,
                price: car.price,
                image: car.image,
                genre: car.genre
            })
        );
        alert(`${car.title} added to cart successfully!`);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-500 text-lg">{error}</p>
        </div>
    );

    if (!car) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-500 text-lg">Car not found</p>
        </div>
    );

    const specs = [
        { icon: MdCalendarMonth, label: 'Manufacturing Year', value: car.manufacturingYear },
        { icon: MdRoute, label: 'Kilometers Done', value: car.kilometersDone },
        { icon: MdSettings, label: 'Transmission', value: car.transmission },
        { icon: MdLocalGasStation, label: 'Fuel Type', value: car.fuelType },
        { icon: MdPalette, label: 'Exterior Color', value: car.exteriorColor },
        { icon: MdOutlineHeight, label: 'Ground Clearance', value: car.groundClearance },
        { icon: MdWorkOutline, label: 'Boot Space', value: car.bootSpace },
        { icon: MdSpeed, label: 'Torque', value: car.torque },
        { icon: MdBolt, label: 'Power', value: car.power },
        { icon: MdDirectionsCar, label: 'Engine Capacity', value: car.engineCapacity },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Back Button */}
                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-[#ff3d00] mb-6 transition-colors"
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft className="text-xl" />
                    <span className="font-medium">Back</span>
                </button>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="h-80 lg:h-auto lg:min-h-[500px] relative overflow-hidden">
                            <img
                                src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                alt={car.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                                }}
                            />
                        </div>

                        {/* Info Section */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">{car.title}</h1>
                            <p className="text-4xl font-bold text-[#ff3d00] mb-6">
                                ${car.price ? car.price.toLocaleString() : "N/A"}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {car.genre && (
                                    <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                                        {car.genre}
                                    </span>
                                )}
                                <span className={`px-4 py-2 text-sm font-medium rounded-full ${car.stock > 0
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-600'
                                    }`}>
                                    {car.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">{car.description}</p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <button
                                    className="flex-1 py-4 px-6 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="flex-1 py-4 px-6 border-2 border-slate-800 text-slate-800 font-bold rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300"
                                    onClick={() => navigate('/contact')}
                                >
                                    Contact Dealer
                                </button>
                            </div>

                            {/* Admin Buttons */}
                            {user?.role === 'admin' && (
                                <div className="flex gap-4 pt-4 border-t border-gray-200">
                                    <button
                                        className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                        onClick={() => navigate(`/admin/edit/${car._id}`)}
                                    >
                                        Edit Details
                                    </button>
                                    <button
                                        className="flex-1 py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                        onClick={handleDelete}
                                    >
                                        Remove Listing
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-8">Technical Specifications</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {specs.map((spec, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                            >
                                <spec.icon className="text-3xl text-[#ff3d00] mb-3" />
                                <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">{spec.label}</span>
                                <span className="text-sm font-semibold text-slate-800">{spec.value || 'N/A'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
