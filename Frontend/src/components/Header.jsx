import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./Header.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo">
          <span>Auto</span>Drive
        </div>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <button className="cta-btn">Book Test Drive</button>
          <button className="login-btn" onClick={() => setIsModalOpen(true)}>
            Login
          </button>
        </div>
      </header>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
