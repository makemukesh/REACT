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
    <div className="home">
      {/* Hero Slider Section */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://www.bmw.com.tw/content/dam/bmw/marketTW/bmw_com_tw/all-models/2series/coupe/2025/navigation/250211-g42-220i-890x500.png"
              alt="Luxury Cars"
            />

            <div className="hero-content">
              <span className="hero-subtitle">Premium Selection</span>
              <h1>Luxury Cars Collection</h1>
              <p className="hero-description">
                Discover premium cars with unmatched performance and comfort in every journey.
              </p>
              <button className="hero-btn" onClick={() => navigate('/cars')}>Explore Cars</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://bmw.scene7.com/is/image/BMW/gkl_home-teaser_dsk_fb?wid=3840&hei=1680"
              alt="Sports Cars"
            />

            <div className="hero-content">
              <span className="hero-subtitle">High Performance</span>
              <h1>Sports Car Experience</h1>
              <p className="hero-description">
                Feel the power, speed, and thrill of world-class sports cars designed for performance.
              </p>
              <button className="hero-btn" onClick={() => navigate('/cars')}>View Models</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://www.shutterstock.com/image-photo/stpetersburg-russia-august-18-2024-600nw-2506393589.jpg"
              alt="Modern Cars"
            />

            <div className="hero-content">
              <span className="hero-subtitle">Future Mobility</span>
              <h1>Modern & Smart Cars</h1>
              <p className="hero-description">
                Technology-driven cars designed for the future generation with smart features.
              </p>
              <button className="hero-btn" onClick={() => navigate('/cars')}>Get Started</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Cars Section */}
      <section className="home-cars-section">
        <div className="home-cars-container">
          <div className="home-cars-header">
            <h2>Our Premium Collection</h2>
            <p>Explore our handpicked selection of luxury and performance vehicles</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading cars...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : null}

          <div className="home-cars-grid">
            {cars.slice(0, 6).map((car) => (
              <div key={car._id || car.id} className="home-car-card">
                <div className="home-car-image-container">
                  <img
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                    alt={car.title}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                  />
                  {car.genre && (
                    <div className="home-category-badge">
                      {car.genre}
                    </div>
                  )}
                </div>
                <div className="home-car-info">
                  <div className="home-car-header-row">
                    <h3>{car.title}</h3>
                    <span className="home-car-price">
                      ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <p className="home-car-desc">
                    {car.description || "Premium vehicle with exceptional features and unmatched performance."}
                  </p>

                  <div className="home-car-specs-box">
                    <div className="home-spec-item">
                      <span className="home-spec-label">Type:</span>
                      <span className="home-spec-value">{car.genre || "N/A"}</span>
                    </div>
                    <div className="home-spec-item">
                      <span className="home-spec-label">Stock:</span>
                      <span className="home-spec-value">{car.stock > 0 ? "Available" : "Out of Stock"}</span>
                    </div>
                  </div>

                  <div className="home-car-actions">
                    <button
                      className="btn-home-details"
                      onClick={() => navigate(`/car/${car._id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn-home-add"
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
