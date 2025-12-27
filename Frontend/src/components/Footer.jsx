import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Auto<span>Drive</span></h3>
                    <p>Your premium destination for luxury and performance vehicles. Experience the thrill of driving.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cars">Cars</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li>Test Drives</li>
                        <li>Car Service</li>
                        <li>Financing</li>
                        <li>Trade-In</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <p>Autocar Road, Gift City, 382000</p>
                    <p>Phone: +91 7990286371</p>
                    <p>Email: contact@autodrive.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AutoDrive. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
