import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../store/cartSlice";
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingCart } from "react-icons/fi";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to access your cart");
            navigate("/");
        }
    }, [navigate]);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    return (
        <div className="cart-page-container">
            <div className="cart-header-section">
                <button onClick={() => navigate(-1)} className="back-link">
                    <FiArrowLeft /> Back
                </button>
                <h1>Shopping Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                    <FiShoppingCart className="empty-icon" />
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any luxury cars to your collection yet.</p>
                    <button onClick={() => navigate("/cars")} className="btn-explore">
                        Explore Collection
                    </button>
                </div>
            ) : (
                <div className="cart-content-grid">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item._id || item.id} className="cart-item-card">
                                <div className="item-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p className="item-genre">{item.genre}</p>
                                    <p className="item-price-each">${(item.price || 0).toLocaleString()}</p>
                                </div>
                                <div className="item-controls">
                                    <div className="quantity-toggle">
                                        <button onClick={() => dispatch(decreaseQty(item._id || item.id))}>
                                            <FiMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(increaseQty(item._id || item.id))}>
                                            <FiPlus />
                                        </button>
                                    </div>
                                    <button
                                        className="btn-remove"
                                        onClick={() => dispatch(removeFromCart(item._id || item.id))}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-section">
                        <div className="summary-card">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free">FREE</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${totalPrice.toLocaleString()}</span>
                            </div>
                            <button className="btn-checkout" onClick={() => navigate("/checkout")}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
