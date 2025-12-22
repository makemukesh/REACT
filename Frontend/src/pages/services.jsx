import React from 'react'

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
    </section>
  )
}

export default Services