import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getAllProducts } from "../../services/productServices";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
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
        setError("Failed to load cars. Please try again later.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Slider Section */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[90vh] [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:bg-white/50 [&_.swiper-pagination-bullet-active]:bg-[#ff3d00]"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://www.bmw.com.tw/content/dam/bmw/marketTW/bmw_com_tw/all-models/2series/coupe/2025/navigation/250211-g42-220i-890x500.png"
              alt="Luxury Cars"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10"></div>
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 text-white z-10 max-w-[600px]">
              <span className="inline-block px-4 py-1.5 bg-[#ff3d00] text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Premium Selection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">Luxury Cars Collection</h1>
              <p className="text-lg text-white/80 mb-8 max-w-[500px]">
                Discover premium cars with unmatched performance and comfort in every journey.
              </p>
              <button
                onClick={() => navigate('/cars')}
                className="px-8 py-4 bg-[#ff3d00] text-white font-bold rounded-lg hover:bg-[#e63600] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Cars
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://bmw.scene7.com/is/image/BMW/gkl_home-teaser_dsk_fb?wid=3840&hei=1680"
              alt="Sports Cars"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10"></div>
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 text-white z-10 max-w-[600px]">
              <span className="inline-block px-4 py-1.5 bg-[#ff3d00] text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                High Performance
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">Sports Car Experience</h1>
              <p className="text-lg text-white/80 mb-8 max-w-[500px]">
                Feel the power, speed, and thrill of world-class sports cars designed for performance.
              </p>
              <button
                onClick={() => navigate('/cars')}
                className="px-8 py-4 bg-[#ff3d00] text-white font-bold rounded-lg hover:bg-[#e63600] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Models
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://www.shutterstock.com/image-photo/stpetersburg-russia-august-18-2024-600nw-2506393589.jpg"
              alt="Modern Cars"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10"></div>
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 text-white z-10 max-w-[600px]">
              <span className="inline-block px-4 py-1.5 bg-[#ff3d00] text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                Future Mobility
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">Modern & Smart Cars</h1>
              <p className="text-lg text-white/80 mb-8 max-w-[500px]">
                Technology-driven cars designed for the future generation with smart features.
              </p>
              <button
                onClick={() => navigate('/cars')}
                className="px-8 py-4 bg-[#ff3d00] text-white font-bold rounded-lg hover:bg-[#e63600] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Cars Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Our Premium Collection</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Explore our handpicked selection of luxury and performance vehicles
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ff3d00] rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Loading cars...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.slice(0, 6).map((car) => (
              <div
                key={car._id || car.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Car Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                  />
                  {car.genre && (
                    <div className="absolute top-3 left-3 bg-[#ff3d00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {car.genre}
                    </div>
                  )}
                </div>

                {/* Car Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-slate-800">{car.title}</h3>
                    <span className="text-[#ff3d00] font-bold text-lg whitespace-nowrap ml-2">
                      ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {car.description || "Premium vehicle with exceptional features and unmatched performance."}
                  </p>

                  {/* Specs */}
                  <div className="flex gap-6 mb-4 py-3 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Type</span>
                      <span className="text-sm font-medium text-slate-700">{car.genre || "N/A"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wide">Stock</span>
                      <span className={`text-sm font-medium ${car.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {car.stock > 0 ? "Available" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-2.5 px-4 bg-[#ff3d00] text-white text-sm font-semibold rounded-lg hover:bg-[#e63600] transition-colors duration-300"
                      onClick={() => navigate(`/car/${car._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="flex-1 py-2.5 px-4 border-2 border-[#ff3d00] text-[#ff3d00] text-sm font-semibold rounded-lg hover:bg-[#ff3d00] hover:text-white transition-all duration-300"
                      onClick={() => handleAddToCart(car)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
