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
      <style>{`
        .home {
          background-color: #f8fafc;
        }

        .mySwiper {
          width: 100%;
          height: 85vh;
          margin-bottom: 50px;
        }

        .slide {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 10s linear;
        }

        .swiper-slide-active .slide img {
          transform: scale(1.15);
        }

        .slide::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.2) 100%);
          z-index: 1;
        }

        .hero-content {
          position: absolute;
          top: 50%;
          left: 10%;
          transform: translateY(-50%);
          color: white;
          z-index: 10;
          max-width: 700px;
          opacity: 0;
          transition: all 0.8s ease 0.3s;
        }

        .swiper-slide-active .hero-content {
          opacity: 1;
          left: 8%;
        }

        .hero-subtitle {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          color: #ff3d00;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 15px;
          background: rgba(255, 61, 0, 0.1);
          padding: 5px 15px;
          border-radius: 4px;
        }

        .hero-content h1 {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 25px;
          text-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-description {
          font-size: 1.25rem;
          margin-bottom: 40px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 500px;
          line-height: 1.6;
        }

        .hero-btn {
          padding: 16px 45px;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          background: #ff3d00;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(255, 61, 0, 0.3);
        }

        .hero-btn:hover {
          background: #e63600;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(255, 61, 0, 0.4);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-content h1 { font-size: 2.5rem; }
          .hero-description { font-size: 1rem; }
          .mySwiper { height: 60vh; }
        }

        /* Grid Enhancements */
        .cars-section {
          padding: 100px 8%;
        }

        .cars-header h2 {
          font-weight: 800;
          letter-spacing: -1px;
        }

        .car-card {
          border: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border-radius: 12px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .car-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .car-image-container {
          height: 240px;
          border-radius: 12px 12px 0 0;
        }

        .btn-add-to-cart-mini {
          flex: 1;
          padding: 12px;
          background: #1e293b;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-add-to-cart-mini:hover {
          background: #0f172a;
        }

        .btn-view-details {
          border-radius: 6px;
          font-weight: 600;
        }
      `}</style>

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
      <section className="cars-section">
        <div className="cars-container">
          <div className="cars-header">
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

          <div className="cars-grid">
            {cars.map((car) => (
              <div key={car._id || car.id} className="car-card">
                <div className="car-image-container">
                  <img
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70"}
                    alt={car.title}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                  />
                  {car.genre && (
                    <div className="car-badge">
                      {car.genre}
                    </div>
                  )}
                </div>
                <div className="car-info">
                  <div className="car-header-info">
                    <h3>{car.title}</h3>
                    <span className="car-price">
                      ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <p className="car-description">
                    {car.description || "Premium vehicle with exceptional features."}
                  </p>
                  <div className="car-specs">
                    <div className="spec-item">
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">{car.genre || "N/A"}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Stock:</span>
                      <span className="spec-value">{car.stock > 0 ? "Available" : "Out of Stock"}</span>
                    </div>
                  </div>
                  <div className="car-actions">
                    <button
                      className="btn-view-details"
                      onClick={() => navigate(`/car/${car._id}`)}
                    >
                      View Details
                    </button>
                    <button className="btn-add-to-cart-mini" onClick={() => handleAddToCart(car)}>Add to Cart</button>
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
