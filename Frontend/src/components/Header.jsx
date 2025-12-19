import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
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

      {/* CTA Button */}
      <div className="cta">
        <button>Book Test Drive</button>
      </div>
    </header>
  );
};

export default Header;
