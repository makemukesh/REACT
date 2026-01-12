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
        <div className="min-h-screen bg-gray-50 py-8 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#ff3d00] transition-colors"
                    >
                        <FiArrowLeft className="text-xl" />
                        <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800">Shopping Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <FiShoppingCart className="text-6xl text-gray-300 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md">
                            Looks like you haven't added any luxury cars to your collection yet.
                        </p>
                        <button
                            onClick={() => navigate("/cars")}
                            className="px-8 py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Explore Collection
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id || item.id}
                                    className="bg-white rounded-2xl p-5 shadow-md flex gap-5 items-center"
                                >
                                    {/* Item Image */}
                                    <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-slate-800 truncate">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.genre}</p>
                                        <p className="text-[#ff3d00] font-bold text-lg mt-1">
                                            ${(item.price || 0).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-4">
                                        {/* Quantity Toggle */}
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                                            <button
                                                onClick={() => dispatch(decreaseQty(item._id || item.id))}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                                            >
                                                <FiMinus className="text-gray-600" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increaseQty(item._id || item.id))}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                                            >
                                                <FiPlus className="text-gray-600" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                            onClick={() => dispatch(removeFromCart(item._id || item.id))}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-medium text-green-600">FREE</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-slate-800">Total</span>
                                        <span className="text-2xl font-bold text-[#ff3d00]">${totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 shadow-lg hover:shadow-xl"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
