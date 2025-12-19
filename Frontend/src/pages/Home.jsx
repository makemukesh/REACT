import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
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
    </div>
  );
};

export default Home;
