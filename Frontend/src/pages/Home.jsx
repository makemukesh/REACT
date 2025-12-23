import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { getAllCars } from "../../services/carServices";

import "swiper/css";
import "swiper/css/pagination";

import "../components/Header.css";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default cars to display if API fails
  const defaultCars = [
    {
      _id: "1",
      name: "BMW M3",
      brand: "BMW",
      model: "M3",
      year: 2024,
      price: 75000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      description: "High-performance luxury sedan with exceptional handling.",
      fuelType: "Petrol",
      mileage: "12 kmpl"
    },
    {
      _id: "2",
      name: "Mercedes-Benz C-Class",
      brand: "Mercedes-Benz",
      model: "C-Class",
      year: 2024,
      price: 65000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
      description: "Elegant and sophisticated with cutting-edge technology.",
      fuelType: "Petrol",
      mileage: "14 kmpl"
    },
    {
      _id: "3",
      name: "Audi A4",
      brand: "Audi",
      model: "A4",
      year: 2024,
      price: 55000,
      image: "https://images.unsplash.com/photo-1606664515524-ed4f768c91f0",
      description: "Premium sedan with quattro all-wheel drive.",
      fuelType: "Petrol",
      mileage: "13 kmpl"
    },
    {
      _id: "4",
      name: "Tesla Model 3",
      brand: "Tesla",
      model: "Model 3",
      year: 2024,
      price: 45000,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
      description: "Electric vehicle with autopilot and supercharging.",
      fuelType: "Electric",
      mileage: "N/A"
    },
    {
      _id: "5",
      name: "Porsche 911",
      brand: "Porsche",
      model: "911",
      year: 2024,
      price: 120000,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      description: "Iconic sports car with legendary performance.",
      fuelType: "Petrol",
      mileage: "10 kmpl"
    },
    {
      _id: "6",
      name: "Lamborghini Huracán",
      brand: "Lamborghini",
      model: "Huracán",
      year: 2024,
      price: 250000,
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763",
      description: "Exotic supercar with breathtaking speed and design.",
      fuelType: "Petrol",
      mileage: "8 kmpl"
    }
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await getAllCars();
        if (response.data && response.data.length > 0) {
          setCars(response.data);
        } else {
          // Use default cars if API returns empty or no data
          setCars(defaultCars);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching cars:", err);
        // Use default cars if API fails
        setCars(defaultCars);
        setError("Unable to fetch cars from server. Showing default cars.");
      } finally {
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
                    alt={car.name || `${car.brand} ${car.model}`}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                    }}
                  />
                  <div className="car-badge">
                    {car.year || "2024"}
                  </div>
                </div>
                <div className="car-info">
                  <div className="car-header-info">
                    <h3>{car.name || `${car.brand || ""} ${car.model || ""}`}</h3>
                    <span className="car-price">
                      ${car.price ? car.price.toLocaleString() : "N/A"}
                    </span>
                  </div>
                  <p className="car-description">
                    {car.description || "Premium vehicle with exceptional features."}
                  </p>
                  <div className="car-specs">
                    <div className="spec-item">
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
