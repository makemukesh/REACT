import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {
        if (cartItems.length === 0 && !isOrderPlaced) {
            navigate("/cart");
        }
    }, [cartItems, navigate, isOrderPlaced]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsOrderPlaced(true);
            dispatch(clearCart());
        }, 1500);
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    if (isOrderPlaced) {
        return (
            <div className="checkout-success-container">
                <div className="success-card">
                    <FiCheckCircle className="success-icon" />
                    <h1>Order Placed Successfully!</h1>
                    <p>Thank you for your purchase. Your luxury vehicle is being prepared for delivery.</p>
                    <p className="order-number">Order ID: #AD-{Math.floor(Math.random() * 90000) + 10000}</p>
                    <button onClick={() => navigate("/")} className="btn-return-home">
                        Return to Showroom
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page-container">
            <div className="checkout-header">
                <button onClick={() => navigate("/cart")} className="back-link">
                    <FiArrowLeft /> Back to Cart
                </button>
                <h1>Checkout</h1>
            </div>

            <form onSubmit={handleSubmit} className="checkout-grid">
                <div className="checkout-form-section">
                    <div className="form-group-card">
                        <h2>Contact Information</h2>
                        <div className="form-row">
                            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
                        </div>
                        <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
                    </div>

                    <div className="form-group-card">
                        <h2>Delivery Address</h2>
                        <input type="text" name="address" placeholder="Street Address" required onChange={handleChange} />
                        <div className="form-row">
                            <input type="text" name="city" placeholder="City" required onChange={handleChange} />
                            <input type="text" name="zip" placeholder="ZIP / Postal Code" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group-card">
                        <h2>Payment Details</h2>
                        <input type="text" name="cardNumber" placeholder="Card Number (0000 0000 0000 0000)" required onChange={handleChange} />
                        <div className="form-row">
                            <input type="text" name="expiry" placeholder="MM/YY" required onChange={handleChange} />
                            <input type="text" name="cvv" placeholder="CVV" required onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="checkout-summary-section">
                    <div className="summary-card">
                        <h2>Summary</h2>
                        <div className="summary-items">
                            {cartItems.map((item) => (
                                <div key={item._id || item.id} className="summary-item">
                                    <span>{item.title} (x{item.quantity})</span>
                                    <span>${((item.price || 0) * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span className="free">FREE</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>${totalPrice.toLocaleString()}</span>
                        </div>

                        <button type="submit" className="btn-place-order">
                            Confirm and Pay
                        </button>
                        <p className="secure-text">🔒 Secure and encrypted transaction</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
