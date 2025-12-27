import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/LoginModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const initials = useMemo(() => {
    if (!user?.name) return "U";
    const parts = user.name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase() || "U";
  }, [user]);

  useEffect(() => {
    const decodeToken = (token) => {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
      } catch (e) {
        return null;
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({
          name: decoded.name || "User",
          email: decoded.email,
          role: decoded.role
        });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowMenu(false);
  };

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
          <Link to="/cars">Cars</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          {!user ? (
            <button className="login-btn" onClick={() => setIsModalOpen(true)}>
              Login
            </button>
          ) : (
            <div className="user-chip" onClick={() => setShowMenu((s) => !s)}>
              <div className="user-avatar">{initials}</div>
              {showMenu && (
                <div className="user-menu">
                  <Link to="/profile" onClick={() => setShowMenu(false)}>Profile</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setShowMenu(false)}>Admin Panel</Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
