import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productServices';
const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await getProductById(id);
                setCar(response.data.product);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError("Failed to load car details.");
                setLoading(false);
            }
        };

        if (id) {
            fetchCars();
        }
    }, [id]);

    if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!car) return <div className="error-message">Car not found</div>;

    return (
        <div className="car-details-page">
            <div className="car-details-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    &larr; Back
                </button>

                <div className="car-details-content">
                    <div className="car-details-image">
                        <img
                            src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                            alt={car.title}
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                            }}
                        />
                    </div>

                    <div className="car-details-info">
                        <h1>{car.title}</h1>
                        <p className="car-price-large">${car.price ? car.price.toLocaleString() : "N/A"}</p>

                        <div className="car-tags">
                            {car.genre && <span className="tag">{car.genre}</span>}
                            <span className={`tag ${car.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                {car.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <p className="car-description-full">
                            {car.description}
                        </p>

                        <div className="action-buttons">
                            <button className="btn-book-now">Book Now</button>
                            <button className="btn-contact-dealer">Contact Dealer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
