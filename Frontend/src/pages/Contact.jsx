import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';

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
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          We are here to help with any questions about our cars, services, or test drives.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMapPin className="text-2xl text-[#ff3d00]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">
              Autocar Road<br />Gift City, 382000
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPhone className="text-2xl text-[#ff3d00]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Call</h3>
            <p className="text-gray-600 text-sm">
              Sales: +91 7990286371<br />Support: +91 7990286371
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-2xl text-[#ff3d00]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Email</h3>
            <p className="text-gray-600 text-sm">
              makwanamukesh2845@gmail.com<br />fusioncars2@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="How can we help?"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff3d00] transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#ff3d00] text-white font-bold rounded-xl hover:bg-[#e63600] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <FiSend /> Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;