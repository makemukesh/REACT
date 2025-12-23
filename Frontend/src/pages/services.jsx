import React from 'react';
import '../components/Header.css';

const Services = () => {
  return (
   <section className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive solutions tailored for your driving needs.</p>
      </div>
      <div className="services-grid">
        <div className="service-card">
          <h3>Vehicle Sales</h3>
          <p>Explore our wide range of new and pre-owned vehicles with flexible financing options.</p>
        </div>
        <div className="service-card">
          <h3>Maintenance & Repairs</h3>
          <p>Keep your vehicle in top condition with our expert maintenance and repair services.</p>
        </div>
        <div className="service-card">
          <h3>Test Drives</h3>
          <p>Experience our vehicles firsthand with scheduled test drives at your convenience.</p>
        </div>
      </div>
      <div className="service-Question">
        <h1>Why Choose Us</h1>
        <ul>
          <li>
            <h3>Experienced & Certified Mechanics</h3>
            <p className="answer">Our certified mechanics bring years of expertise to ensure your vehicle receives the best care with professional service and attention to detail.</p>
          </li>
          <li>
            <h3>Genuine Spare Parts</h3>
            <p className="answer">We use only genuine spare parts from authorized dealers, ensuring quality, reliability, and optimal performance for your vehicle.</p>
          </li>
          <li>
            <h3>Affordable Pricing & Transparent Billing</h3>
            <p className="answer">Enjoy competitive pricing with complete transparency. No hidden charges - you'll know exactly what you're paying for upfront.</p>
          </li>
          <li>
            <h3>Quick Turnaround Time</h3>
            <p className="answer">We value your time. Our efficient service process ensures your vehicle is back on the road as quickly as possible without compromising quality.</p>
          </li>
          <li>
            <h3>Customer Satisfaction Guaranteed</h3>
            <p className="answer">Your satisfaction is our priority. We stand behind our work with comprehensive warranties and dedicated customer support.</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Services