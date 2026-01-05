import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Header.css';

const Footer = () => {
    return (
        <footer className="footer-premium">
            <div className="footer-content-premium">
                <div className="footer-brand-section">
                    <h2 className="footer-logo">Auto<span>Drive</span></h2>
                    <p className="footer-tagline">
                        Experience the epitome of automotive excellence. We bring you the finest collection of luxury and performance vehicles.
                    </p>
                    <div className="footer-socials">
                        <a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://x.com/home" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://www.instagram.com/" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>Explore</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/cars">Inventory</Link></li>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/services">Services</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column newsletter-column">
                        <h4>Stay Updated</h4>
                        <p>Subscribe to our newsletter for exclusive offers and new arrivals.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email address" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="footer-bottom-premium">
                <div className="footer-info">
                    <span>&copy; {new Date().getFullYear()} AutoDrive Inc.</span>
                    <span>Designed for Excellence.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
