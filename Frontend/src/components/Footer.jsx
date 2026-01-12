import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold mb-4">
                            Auto<span className="text-[#ff3d00]">Drive</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Experience the epitome of automotive excellence. We bring you the finest collection of luxury and performance vehicles.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/"
                                aria-label="Facebook"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#ff3d00] hover:scale-110 transition-all duration-300"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://x.com/home"
                                aria-label="Twitter"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#ff3d00] hover:scale-110 transition-all duration-300"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                aria-label="Instagram"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#ff3d00] hover:scale-110 transition-all duration-300"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://linkedin.com"
                                aria-label="LinkedIn"
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#ff3d00] hover:scale-110 transition-all duration-300"
                            >
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">Explore</h4>
                            <ul className="space-y-3">
                                <li><Link to="/" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Home</Link></li>
                                <li><Link to="/cars" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Inventory</Link></li>
                                <li><Link to="/emi-calculator" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">EMI Calculator</Link></li>
                                <li><Link to="/about" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Our Story</Link></li>
                                <li><Link to="/services" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Services</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
                            <ul className="space-y-3">
                                <li><Link to="/contact" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Contact Us</Link></li>
                                <li><Link to="/faq" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">FAQs</Link></li>
                                <li><Link to="/privacy" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="text-gray-400 hover:text-[#ff3d00] transition-colors text-sm">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <span>&copy; {new Date().getFullYear()} AutoDrive Inc.</span>
                    <span>Designed for Excellence.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
