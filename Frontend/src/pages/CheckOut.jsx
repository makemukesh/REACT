import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";
import { createOrder } from "../../services/orderServices";

const DeliveryAnimation = ({ carImage }) => {
    return (
        <div className="delivery-animation-box">
            <div className="animation-road"></div>
            <div className="truck-wrapper">
                <div className="truck-body">
                    <div className="truck-cabin"></div>
                    <div className="truck-bed">
                        <div className="loaded-car">
                            <img src={carImage} alt="Loaded Vehicle" />
                        </div>
                    </div>
                    <div className="truck-wheel wheel-1"></div>
                    <div className="truck-wheel wheel-2"></div>
                </div>
            </div>
            <div className="loading-effect-text">PREPARING YOUR LUXURY SHIPMENT...</div>
        </div>
    );
};

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
    });

    useEffect(() => {
        if (cartItems.length === 0 && !isOrderPlaced) {
            navigate("/cart");
        }
    }, [cartItems, navigate, isOrderPlaced]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        setLoading(true);
        const res = await loadRazorpay();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }

        const totalPriceValue = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

        const options = {
            key: "rzp_test_RwZ8MWEM2Bc67U",
            amount: totalPriceValue * 100, // Amount in paise
            currency: "INR",
            name: "AutoDrive Luxury",
            description: "Premium Car Purchase",
            image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
            handler: async function (response) {
                try {
                    await createOrder({
                        orderItems: cartItems.map(item => ({
                            product: item._id || item.id,
                            title: item.title,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image
                        })),
                        shippingAddress: formData,
                        totalPrice: totalPriceValue,
                        paymentId: response.razorpay_payment_id
                    });
                    setIsOrderPlaced(true);
                    dispatch(clearCart());
                    setLoading(false);
                } catch (err) {
                    console.error("Error creating order:", err);
                    alert("Payment successful, but failed to save order. Please contact support.");
                    setLoading(false);
                }
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone,
            },
            notes: {
                address: formData.address,
            },
            theme: {
                color: "#ff3d00",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    if (isOrderPlaced) {
        return (
            <div className="checkout-success-container">
                <div className="success-overlay-glow"></div>
                <div className="success-card">
                    <div className="success-header-top">
                        <FiCheckCircle className="success-icon" />
                        <h1>Payment Confirmed!</h1>
                    </div>

                    <DeliveryAnimation carImage={cartItems[0]?.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"} />

                    <div className="success-info-bottom">
                        <p>Your order has been secured. Our transport team is now dispatching your vehicle to the provided address.</p>
                        <div className="order-details-summary">
                            <span className="order-number">Order ID: #AD-{Math.floor(Math.random() * 90000) + 10000}</span>
                            <span className="order-track-info">Track delivery in your profile</span>
                        </div>
                        <button onClick={() => navigate("/")} className="btn-return-home">
                            Explore More Vehicles
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page-container">
            <div className="checkout-header-stepper">
                <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                    <div className="step-number"><FiUser /></div>
                    <span>Details</span>
                </div>
                <div className="step-line"></div>
                <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                    <div className="step-number"><FiCreditCard /></div>
                    <span>Payment</span>
                </div>
            </div>

            <div className="checkout-main-grid">
                <div className="checkout-left-col">
                    {step === 1 ? (
                        <form onSubmit={handleNextStep} className="checkout-step-form">
                            <div className="form-section-card">
                                <h2><FiUser /> Personal Details</h2>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" placeholder="+91 98765 43210" required value={formData.phone} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section-card">
                                <h2><FiMapPin /> Delivery Address</h2>
                                <div className="input-group">
                                    <label>Street Address</label>
                                    <input type="text" name="address" placeholder="123 Luxury Lane" required value={formData.address} onChange={handleChange} />
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>City</label>
                                        <input type="text" name="city" placeholder="Mumbai" required value={formData.city} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>ZIP/Postal Code</label>
                                        <input type="text" name="zip" placeholder="400001" required value={formData.zip} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-continue-step">
                                Continue to Payment
                            </button>
                        </form>
                    ) : (
                        <div className="payment-step-container">
                            <div className="payment-summary-card">
                                <h2>Review Your Information</h2>
                                <div className="review-grid">
                                    <div className="review-item">
                                        <strong>Name:</strong>
                                        <span>{formData.firstName} {formData.lastName}</span>
                                    </div>
                                    <div className="review-item">
                                        <strong>Contact:</strong>
                                        <span>{formData.email} | {formData.phone}</span>
                                    </div>
                                    <div className="review-item">
                                        <strong>Address:</strong>
                                        <span>{formData.address}, {formData.city} - {formData.zip}</span>
                                    </div>
                                </div>
                                <button className="btn-edit-details" onClick={() => setStep(1)}>
                                    Edit Details
                                </button>
                            </div>

                            <div className="payment-methods-card">
                                <h2>Select Payment Method</h2>
                                <div className="payment-methods-grid">
                                    <div className="payment-option active" onClick={handleRazorpayPayment}>
                                        <div className="option-header">
                                            <div className="option-title">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" style={{ height: '18px' }} />
                                                <span>Secure Online Payment</span>
                                            </div>
                                            <div className="option-badge">Recommended</div>
                                        </div>
                                        <p className="option-desc">UPI, Credit/Debit Cards, NetBanking, and Wallets</p>
                                        <div className="method-icons">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                        </div>
                                    </div>

                                    <div className="payment-option disabled">
                                        <div className="option-header">
                                            <div className="option-title">
                                                <FiCreditCard />
                                                <span>Cash on Delivery</span>
                                            </div>
                                        </div>
                                        <p className="option-desc">Currently unavailable for high-value transactions</p>
                                    </div>
                                </div>

                                <button
                                    className={`btn-pay-now ${loading ? 'loading' : ''}`}
                                    onClick={handleRazorpayPayment}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : `Complete Purchase - pay ₹${totalPrice.toLocaleString()}`}
                                </button>
                                <p className="secure-footer">🔒 All transactions are secured and encrypted with SSL</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="checkout-right-col">
                    <div className="order-summary-card">
                        <h2>Order Summary</h2>
                        <div className="cart-items-preview">
                            {cartItems.map((item) => (
                                <div key={item._id || item.id} className="preview-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="item-meta">
                                        <h4>{item.title}</h4>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">
                                        ${((item.price || 0) * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="price-details">
                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>${totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="price-row">
                                <span>Delivery Cost</span>
                                <span className="free">FREE</span>
                            </div>
                            <div className="price-total">
                                <span>Grand Total</span>
                                <span>${totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
