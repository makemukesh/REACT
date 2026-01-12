import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Driving the Future of Mobility</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Innovation, sustainability, and unparalleled luxury crafted for the modern road.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At AutoDrive, we believe that a car is more than just a mode of transportation—it's an extension of your lifestyle.
                Our mission is to deliver reliable mobility with cutting-edge technology, thoughtful design, and service you can trust.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are looking for a high-performance sports car or an eco-friendly electric vehicle, we curate the finest selection to match your desires.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <span className="block text-4xl font-bold text-[#ff3d00] mb-2">15+</span>
                <span className="text-gray-500 text-sm">Years of Excellence</span>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <span className="block text-4xl font-bold text-[#ff3d00] mb-2">50k+</span>
                <span className="text-gray-500 text-sm">Happy Drivers</span>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <span className="block text-4xl font-bold text-[#ff3d00] mb-2">120</span>
                <span className="text-gray-500 text-sm">Global Centers</span>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <span className="block text-4xl font-bold text-[#ff3d00] mb-2">24/7</span>
                <span className="text-gray-500 text-sm">Premium Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff3d00] transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We believe in transparent pricing and honest advice, ensuring you make the best decision for your journey.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff3d00] transition-colors">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Embracing the latest in automotive technology to bring you safe, efficient, and smart vehicles.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group">
              <div className="w-16 h-16 bg-[#ff3d00]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff3d00] transition-colors">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. From the first test drive to after-sales service, we are with you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;