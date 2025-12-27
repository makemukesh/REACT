import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    return (
        <div className="car-card">
            <div className="car-image-container">
                <img
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                    alt={car.title}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                />
                {car.genre && <div className="car-badge">{car.genre}</div>}
            </div>
            <div className="car-info">
                <div className="car-header-info">
                    <h3>{car.title}</h3>
                    <span className="car-price">
                        ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                </div>
                <p className="car-description">
                    {car.description
                        ? car.description.substring(0, 100) + "..."
                        : "Premium vehicle."}
                </p>
                <div className="car-specs">
                    <div className="spec-item">
                        <span className="spec-label">Type:</span>
                        <span className="spec-value">{car.genre || "N/A"}</span>
                    </div>
                    <div className="spec-item">
                        <span className="spec-label">Stock:</span>
                        <span className="spec-value">
                            {car.stock > 0 ? "Available" : "Out of Stock"}
                        </span>
                    </div>
                </div>
                <div className="car-actions">
                    <button
                        className="btn-view-details"
                        onClick={() => navigate(`/car/${car._id}`)}
                    >
                        View Details
                    </button>
                    <button className="btn-book-test-drive">Book Test Drive</button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
