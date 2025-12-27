import React from 'react';
import '../components/Header.css';

<<<<<<< HEAD
=======
import Faqs from '../components/Faqs';

>>>>>>> 699a03d (inital deployment)
const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <h1>About AutoDrive</h1>
        <p>Innovation, safety, and performance—crafted for every road you take.</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To deliver reliable mobility with cutting-edge technology, thoughtful design, and
            service you can trust.
          </p>
        </div>
        <div className="about-card">
          <h3>What We Offer</h3>
          <ul>
            <li>Electric and hybrid vehicles</li>
            <li>Comprehensive service plans</li>
            <li>Flexible financing options</li>
            <li>Test drives at your doorstep</li>
          </ul>
        </div>
        <div className="about-card">
          <h3>Why Choose Us</h3>
          <p>
            We pair expert guidance with transparent pricing, ensuring every driver feels confident
            from first inquiry to every mile thereafter.
          </p>
        </div>
      </div>

      <div className="about-stats">
        <div className="stat">
          <span className="stat-number">15+</span>
          <span className="stat-label">Years of service</span>
        </div>
        <div className="stat">
          <span className="stat-number">50k</span>
          <span className="stat-label">Happy drivers</span>
        </div>
        <div className="stat">
          <span className="stat-number">120</span>
          <span className="stat-label">Service centers</span>
        </div>
        <div className="stat">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Support</span>
        </div>
      </div>
<<<<<<< HEAD
=======

      <Faqs />
>>>>>>> 699a03d (inital deployment)
    </section>
  );
};

export default About;