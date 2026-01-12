import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/productServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (car) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to add items to your cart.");
            return;
        }
        dispatch(addToCart(car));
        alert(`${car.title} added to cart!`);
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await getAllProducts();
                if (response.data && response.data.products) {
                    setCars(response.data.products);
                } else {
                    setCars(response.data || []);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching cars:", err);
                setError("Failed to load cars.");
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const [filters, setFilters] = useState({
        brand: 'All',
        priceRange: 'All',
        type: 'All'
    });

    const brands = ['All', 'BMW', 'Mercedes', 'Audi', 'Bentley', 'Porsche', 'Ferrari', 'Lamborghini', 'Rolls Royce'];
    const priceRanges = [
        { label: 'All Prices', value: 'All' },
        { label: 'Under ₹50L', value: '0-5000000' },
        { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
        { label: 'Above ₹1Cr', value: '10000000-1000000000' }
    ];
    const types = ['All', 'SUV', 'Sedan', 'Coupe', 'Convertible', 'Sports'];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredCars = cars.filter(car => {
        if (filters.brand !== 'All' && car.brand !== filters.brand) {
            return false;
        }
        if (filters.type !== 'All' && car.genre !== filters.type) {
            return false;
        }
        if (filters.priceRange !== 'All') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (car.price < min || car.price > max) return false;
        }
        return true;
    });

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Complete Collection</h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                    Browse through our extensive range of premium vehicles and find your perfect drive.
                </p>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-[70px] z-50 bg-white shadow-md py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 md:gap-6">
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Brand</label>
                        <select
                            value={filters.brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff3d00] min-w-[140px]"
                        >
                            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Price Range</label>
                        <select
                            value={filters.priceRange}
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff3d00] min-w-[140px]"
                        >
                            {priceRanges.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Body Type</label>
                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff3d00] min-w-[140px]"
                        >
                            {types.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="ml-auto text-sm font-medium text-gray-600">
                        Showing <span className="text-[#ff3d00] font-bold">{filteredCars.length}</span> vehicles
                    </div>
                </div>
            </div>

            {/* Cars Grid */}
            <div className="max-w-7xl mx-auto py-12 px-6">
                {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCars.map((car) => (
                            <div
                                key={car._id || car.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                            >
                                {/* Car Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                        alt={car.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                                        }}
                                    />
                                    {car.genre && (
                                        <div className="absolute top-3 left-3 bg-[#ff3d00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            {car.genre}
                                        </div>
                                    )}
                                </div>

                                {/* Car Info */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-bold text-slate-800">{car.title}</h3>
                                        <span className="text-[#ff3d00] font-bold text-lg whitespace-nowrap ml-2">
                                            ${car.price ? car.price.toLocaleString() : "N/A"}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                        {car.description ? car.description.substring(0, 100) + "..." : "Premium vehicle."}
                                    </p>

                                    {/* Specs */}
                                    <div className="flex gap-6 mb-4 py-3 border-t border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Type</span>
                                            <span className="text-sm font-medium text-slate-700">{car.genre || "N/A"}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Stock</span>
                                            <span className={`text-sm font-medium ${car.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                {car.stock > 0 ? "Available" : "Out of Stock"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            className="flex-1 py-2.5 px-4 bg-[#ff3d00] text-white text-sm font-semibold rounded-lg hover:bg-[#e63600] transition-colors duration-300"
                                            onClick={() => navigate(`/car/${car._id}`)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="flex-1 py-2.5 px-4 border-2 border-[#ff3d00] text-[#ff3d00] text-sm font-semibold rounded-lg hover:bg-[#ff3d00] hover:text-white transition-all duration-300"
                                            onClick={() => handleAddToCart(car)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-600 mb-4">No vehicles found matching your criteria.</h3>
                        <button
                            onClick={() => setFilters({ brand: 'All', priceRange: 'All', type: 'All' })}
                            className="px-6 py-3 bg-[#ff3d00] text-white font-semibold rounded-lg hover:bg-[#e63600] transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cars;
