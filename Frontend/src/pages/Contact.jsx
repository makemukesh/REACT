import React, { useState } from 'react';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We are here to help with any questions about our cars, services, or test drives.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Visit Us</h3>
          <p>Autocar Road<br />Gift City,382000</p>
        </div>

        <div className="contact-card">
          <h3>Call</h3>
          <p>Sales: +91 7990286371<br />Support: +91 7990286371</p>
        </div>

        <div className="contact-card">
          <h3>Email</h3>
          <p>makwanamukesh2845@gmail.com<br />fusioncars2@gmail.com</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="How can we help?"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;