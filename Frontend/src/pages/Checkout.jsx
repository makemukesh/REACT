import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import {
  FiCheckCircle,
  FiCreditCard,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { createOrder } from "../../services/orderServices";

const DeliveryAnimation = ({ carImage }) => {
  return (
    <div className="relative bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl p-8 overflow-hidden my-8">
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-300"></div>
      <div className="flex items-center justify-center">
        <div className="relative animate-bounce">
          <div className="w-32 h-20 bg-slate-700 rounded-lg flex items-center justify-center">
            <img
              src={carImage}
              alt="Loaded Vehicle"
              className="w-20 h-12 object-cover rounded"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-sm font-semibold text-slate-600 tracking-wider animate-pulse">
        PREPARING YOUR LUXURY SHIPMENT...
      </div>
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [step, setStep] = useState(1);
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

    const totalPriceValue = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );

    const options = {
      key: "rzp_test_RwZ8MWEM2Bc67U",
      amount: totalPriceValue * 100,
      currency: "INR",
      name: "AutoDrive Luxury",
      description: "Premium Car Purchase",
      image: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png",
      handler: async function (response) {
        try {
          await createOrder({
            orderItems: cartItems.map((item) => ({
              product: item._id || item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
            shippingAddress: formData,
            totalPrice: totalPriceValue,
            paymentId: response.razorpay_payment_id,
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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  // Success Screen
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-4xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Payment Confirmed!</h1>

          <DeliveryAnimation
            carImage={cartItems[0]?.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
          />

          <p className="text-gray-600 mb-6">
            Your order has been secured. Our transport team is now dispatching your vehicle to the provided address.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <span className="block text-lg font-bold text-slate-800">
              Order ID: #AD-{Math.floor(Math.random() * 90000) + 10000}
            </span>
            <span className="text-sm text-gray-500">Track delivery in your profile</span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300"
          >
            Explore More Vehicles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#ff3d00]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#ff3d00] text-white' : 'bg-gray-200'}`}>
              <FiUser />
            </div>
            <span className="font-medium hidden sm:inline">Details</span>
          </div>
          <div className={`w-20 h-1 rounded-full ${step >= 2 ? 'bg-[#ff3d00]' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#ff3d00]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#ff3d00] text-white' : 'bg-gray-200'}`}>
              <FiCreditCard />
            </div>
            <span className="font-medium hidden sm:inline">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* Personal Details */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <FiUser className="text-[#ff3d00]" /> Personal Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <FiMapPin className="text-[#ff3d00]" /> Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="123 Luxury Lane"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Mumbai"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                        <input
                          type="text"
                          name="zip"
                          placeholder="400001"
                          required
                          value={formData.zip}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 shadow-lg"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Review Info */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-slate-800 mb-4">Review Your Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    <div>
                      <span className="text-sm text-gray-400">Name</span>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Contact</span>
                      <p className="font-medium">{formData.email}</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-sm text-gray-400">Address</span>
                      <p className="font-medium">{formData.address}, {formData.city} - {formData.zip}</p>
                    </div>
                  </div>
                  <button
                    className="mt-4 text-[#ff3d00] font-medium hover:underline"
                    onClick={() => setStep(1)}
                  >
                    Edit Details
                  </button>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Select Payment Method</h2>

                  <div className="space-y-4">
                    {/* Razorpay Option */}
                    <div
                      className="border-2 border-[#ff3d00] rounded-xl p-5 cursor-pointer hover:bg-orange-50 transition-colors"
                      onClick={handleRazorpayPayment}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                            alt="Razorpay"
                            className="h-5"
                          />
                          <span className="font-medium">Secure Online Payment</span>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Recommended</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">UPI, Credit/Debit Cards, NetBanking, and Wallets</p>
                      <div className="flex items-center gap-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      </div>
                    </div>

                    {/* COD Option (Disabled) */}
                    <div className="border border-gray-200 rounded-xl p-5 opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-3 mb-2">
                        <FiCreditCard className="text-xl text-gray-400" />
                        <span className="font-medium text-gray-400">Cash on Delivery</span>
                      </div>
                      <p className="text-sm text-gray-400">Currently unavailable for high-value transactions</p>
                    </div>
                  </div>

                  <button
                    className={`w-full mt-6 py-4 bg-[#ff3d00] text-white font-bold rounded-xl transition-all duration-300 shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e63600]'}`}
                    onClick={handleRazorpayPayment}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Complete Purchase - ₹${totalPrice.toLocaleString()}`}
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    🔒 All transactions are secured and encrypted with SSL
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

              <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-800 truncate">{item.title}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-800">
                      ${((item.price || 0) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Cost</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-slate-800">Grand Total</span>
                  <span className="text-xl font-bold text-[#ff3d00]">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
