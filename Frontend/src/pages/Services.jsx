import React from 'react';
import { FaCar, FaTools, FaHandshake } from 'react-icons/fa';
import { FiShield, FiAward, FiClock, FiTrendingUp } from 'react-icons/fi';

const Services = () => {
  return (
    <section className="services-page">
      <div className="services-hero">
        <h1>Premium Automotive Services</h1>
        <p>Comprehensive solutions tailored for your ultimate driving experience.</p>
      </div>

      <div className="services-grid-premium">
        <div className="service-card-premium">
          <div className="icon-box"><FaCar /></div>
          <h3>Vehicle Sales</h3>
          <p>Explore our exclusive range of new and certified pre-owned luxury vehicles with flexible financing options.</p>
        </div>
        <div className="service-card-premium">
          <div className="icon-box"><FaTools /></div>
          <h3>Expert Maintenance</h3>
          <p>State-of-the-art service center with certified technicians keeping your vehicle in peak condition.</p>
        </div>
        <div className="service-card-premium">
          <div className="icon-box"><FaHandshake /></div>
          <h3>Trade-In & Sell</h3>
          <p>Get the best value for your current vehicle with our transparent and competitive trade-in process.</p>
        </div>
        <div className="service-card-premium">
          <div className="icon-box"><FiShield /></div>
          <h3>Warranty & Protection</h3>
          <p>Comprehensive warranty plans and insurance options to give you complete peace of mind.</p>
        </div>
      </div>

      <div className="why-choose-us-section">
        <h2>Why Choose AutoDrive?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <FiAward className="benefit-icon" />
            <h4>Certified Excellence</h4>
            <p>Award-winning service and highest customer satisfaction ratings.</p>
          </div>
          <div className="benefit-item">
            <FiClock className="benefit-icon" />
            <h4>Quick Turnaround</h4>
            <p>Efficient service process ensuring you are back on the road in no time.</p>
          </div>
          <div className="benefit-item">
            <FiTrendingUp className="benefit-icon" />
            <h4>Best Value</h4>
            <p>Transparent pricing and competitive rates on all cars and services.</p>
          </div>
        </div>
      </div>
      <div className="financial-tools-section">
        <h2>Financial Tools & Resources</h2>
        <div className="tools-grid">
          <div className="tool-card" onClick={() => window.location.href = '/emi-calculator'}>
            <h3>EMI Calculator</h3>
            <p>Plan your budget with our easy-to-use finance calculator.</p>
            <button className="btn-link">Calculate Now &rarr;</button>
          </div>
          <div className="tool-card" onClick={() => window.location.href = '/sell-car'}>
            <h3>Sell Your Car</h3>
            <p>Get an instant valuation and best price for your vehicle.</p>
            <button className="btn-link">Get Quote &rarr;</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services