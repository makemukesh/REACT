import React from 'react';

const Contact = () => {
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
        <form>
          <div className="form-row">
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Your email" required />
          </div>
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea name="message" rows="5" placeholder="How can we help?" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;