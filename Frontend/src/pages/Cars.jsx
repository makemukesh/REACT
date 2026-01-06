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
        // Brand Filter
        if (filters.brand !== 'All' && !car.title.toLowerCase().includes(filters.brand.toLowerCase())) {
            return false;
        }
        // Type Filter (assuming genre maps to type)
        if (filters.type !== 'All' && car.genre !== filters.type) {
            return false;
        }
        // Price Filter
        if (filters.priceRange !== 'All') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (car.price < min || car.price > max) return false;
        }
        return true;
    });

    if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="cars-page">
            <div className="cars-banner">
                <h1>Our Complete Collection</h1>
                <p>Browse through our extensive range of premium vehicles and find your perfect drive.</p>
            </div>

            {/* Filter Bar */}
            <div className="cars-filter-bar">
                <div className="filter-group">
                    <label>Brand</label>
                    <select
                        value={filters.brand}
                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                    >
                        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Price Range</label>
                    <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    >
                        {priceRanges.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Body Type</label>
                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        {types.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div className="filter-results-count">
                    Showing {filteredCars.length} vehicles
                </div>
            </div>

            <div className="cars-grid">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div key={car._id || car.id} className="car-card">
                            <div className="car-image-container">
                                <img
                                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                                    alt={car.title}
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                                    }}
                                />
                                {car.genre && (
                                    <div className="car-badge">{car.genre}</div>
                                )}
                            </div>
                            <div className="car-info">
                                <div className="car-header-info">
                                    <h3>{car.title}</h3>
                                    <span className="car-price">
                                        ${car.price ? car.price.toLocaleString() : "N/A"}
                                    </span>
                                </div>
                                <p className="car-description">
                                    {car.description ? car.description.substring(0, 100) + "..." : "Premium vehicle."}
                                </p>
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <span className="spec-label">Type:</span>
                                        <span className="spec-value">{car.genre || "N/A"}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Stock:</span>
                                        <span className="spec-value">{car.stock > 0 ? "Available" : "Out of Stock"}</span>
                                    </div>
                                </div>
                                <div className="car-actions">
                                    <button
                                        className="btn-view-details"
                                        onClick={() => navigate(`/car/${car._id}`)}
                                    >
                                        View Details
                                    </button>
                                    <button className="btn-add-to-cart-mini" onClick={() => handleAddToCart(car)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-cars-message">
                        <h3>No vehicles found matching your criteria.</h3>
                        <button onClick={() => setFilters({ brand: 'All', priceRange: 'All', type: 'All' })}>Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cars;
