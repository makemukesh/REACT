import React from 'react';
import { FaCar, FaTools, FaHandshake } from 'react-icons/fa';
import { FiShield, FiAward, FiClock, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: FaCar,
      title: 'Vehicle Sales',
      description: 'Explore our exclusive range of new and certified pre-owned luxury vehicles with flexible financing options.'
    },
    {
      icon: FaTools,
      title: 'Expert Maintenance',
      description: 'State-of-the-art service center with certified technicians keeping your vehicle in peak condition.'
    },
    {
      icon: FaHandshake,
      title: 'Trade-In & Sell',
      description: 'Get the best value for your current vehicle with our transparent and competitive trade-in process.'
    },
    {
      icon: FiShield,
      title: 'Warranty & Protection',
      description: 'Comprehensive warranty plans and insurance options to give you complete peace of mind.'
    }
  ];

  const benefits = [
    {
      icon: FiAward,
      title: 'Certified Excellence',
      description: 'Award-winning service and highest customer satisfaction ratings.'
    },
    {
      icon: FiClock,
      title: 'Quick Turnaround',
      description: 'Efficient service process ensuring you are back on the road in no time.'
    },
    {
      icon: FiTrendingUp,
      title: 'Best Value',
      description: 'Transparent pricing and competitive rates on all cars and services.'
    }
  ];

  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Automotive Services</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Comprehensive solutions tailored for your ultimate driving experience.
        </p>
      </div>

      {/* Services Grid */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#ff3d00] transition-colors">
                <service.icon className="text-2xl text-[#ff3d00] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">Why Choose AutoDrive?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-2xl text-[#ff3d00]" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Tools Section */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Financial Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => navigate('/emi-calculator')}
            >
              <h3 className="text-xl font-bold text-slate-800 mb-3">EMI Calculator</h3>
              <p className="text-gray-600 mb-4">Plan your budget with our easy-to-use finance calculator.</p>
              <button className="text-[#ff3d00] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Calculate Now <FiArrowRight />
              </button>
            </div>
            <div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => navigate('/sell-car')}
            >
              <h3 className="text-xl font-bold text-slate-800 mb-3">Sell Your Car</h3>
              <p className="text-gray-600 mb-4">Get an instant valuation and best price for your vehicle.</p>
              <button className="text-[#ff3d00] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Get Quote <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;