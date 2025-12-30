import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productServices';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

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
                            {user?.role === 'admin' ? (
                                <>
                                    <button className="btn-edit-details" onClick={() => navigate(`/admin/edit/${car._id}`)}>
                                        Edit Car
                                    </button>
                                    <button className="btn-delete-details" onClick={handleDelete}>
                                        Delete Car
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>
                                    <button className="btn-contact-dealer" onClick={() => navigate('/contact')}>
                                        Contact Dealer
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
