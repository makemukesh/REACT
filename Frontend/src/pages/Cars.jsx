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

    if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="cars-page">
            <div className="cars-header">
                <h1>Our Complete Collection</h1>
                <p>Browse through our extensive range of premium vehicles.</p>
            </div>

            <div className="cars-grid" style={{ padding: '0 20px' }}>
                {cars.map((car) => (
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
                ))}
            </div>
        </div>
    );
};

export default Cars;
