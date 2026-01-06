import React from 'react';



const About = () => {
  return (
    <section className="about-page-premium">
      <div className="about-hero-premium">
        <div className="hero-text-content">
          <h1>Driving the Future of Mobility</h1>
          <p className="hero-subtitle">Innovation, sustainability, and unparalleled luxury crafted for the modern road.</p>
        </div>
      </div>

      <div className="mission-section-premium">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            At AutoDrive, we believe that a car is more than just a mode of transportation—it's an extension of your lifestyle.
            Our mission is to deliver reliable mobility with cutting-edge technology, thoughtful design, and service you can trust.
          </p>
          <p>
            Whether you are looking for a high-performance sports car or an eco-friendly electric vehicle, we curate the finest selection to match your desires.
          </p>
        </div>
        <div className="mission-stats-grid">
          <div className="stat-card">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years of Excellence</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Happy Drivers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">120</span>
            <span className="stat-label">Global Centers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Premium Support</span>
          </div>
        </div>
      </div>

      <div className="core-values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We believe in transparent pricing and honest advice, ensuring you make the best decision for your journey.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Embracing the latest in automotive technology to bring you safe, efficient, and smart vehicles.</p>
          </div>
          <div className="value-card">
            <h3>Customer First</h3>
            <p>Your satisfaction is our priority. From the first test drive to after-sales service, we are with you.</p>
          </div>
        </div>
      </div>


    </section>
  );
};

export default About;