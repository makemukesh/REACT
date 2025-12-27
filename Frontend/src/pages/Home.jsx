import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
<<<<<<< HEAD

=======
import { getAllProducts } from "../../services/productServices";
import { useNavigate } from 'react-router-dom';
>>>>>>> 699a03d (inital deployment)

import "swiper/css";
import "swiper/css/pagination";

import "../components/Header.css";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD

 
=======
  const navigate = useNavigate();

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

>>>>>>> 699a03d (inital deployment)
  return (
    <div className="home">
      {/* Hero Slider Section */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        loop={true}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Luxury Cars"
            />

            <div className="hero-content">
              <h1>Luxury Cars Collection</h1>
              <p>
                Discover premium cars with unmatched performance and comfort.
              </p>
              <button>Explore Cars</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://images.unsplash.com/photo-1493238792000-8113da705763"
              alt="Sports Cars"
            />

            <div className="hero-content">
              <h1>Sports Car Experience</h1>
              <p>
                Feel the power, speed, and thrill of world-class sports cars.
              </p>
              <button>View Models</button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="slide">
            <img
              src="https://images.unsplash.com/photo-1542362567-b07e54358753"
              alt="Modern Cars"
            />

            <div className="hero-content">
              <h1>Modern & Smart Cars</h1>
              <p>
                Technology-driven cars designed for the future generation.
              </p>
              <button>Get Started</button>
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
<<<<<<< HEAD
                    alt={car.name || `${car.brand} ${car.model}`}
=======
                    alt={car.title}
>>>>>>> 699a03d (inital deployment)
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                  />
<<<<<<< HEAD
                  <div className="car-badge">
                    {car.year || "2024"}
                  </div>
                </div>
                <div className="car-info">
                  <div className="car-header-info">
                    <h3>{car.name || `${car.brand || ""} ${car.model || ""}`}</h3>
=======
                  {car.genre && (
                    <div className="car-badge">
                      {car.genre}
                    </div>
                  )}
                </div>
                <div className="car-info">
                  <div className="car-header-info">
                    <h3>{car.title}</h3>
>>>>>>> 699a03d (inital deployment)
                    <span className="car-price">
                      ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <p className="car-description">
                    {car.description || "Premium vehicle with exceptional features."}
                  </p>
                  <div className="car-specs">
                    <div className="spec-item">
<<<<<<< HEAD
                      <span className="spec-label">Brand:</span>
                      <span className="spec-value">{car.brand || "N/A"}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Model:</span>
                      <span className="spec-value">{car.model || "N/A"}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Fuel:</span>
                      <span className="spec-value">{car.fuelType || "N/A"}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Mileage:</span>
                      <span className="spec-value">{car.mileage || "N/A"}</span>
                    </div>
                  </div>
                  <div className="car-actions">
                    <button className="btn-view-details">View Details</button>
=======
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
>>>>>>> 699a03d (inital deployment)
                    <button className="btn-book-test-drive">Book Test Drive</button>
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
