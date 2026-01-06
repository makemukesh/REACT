import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const cartCount = useSelector((state) => state.cart.items.length);

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
    localStorage.removeItem("user");
    setUser(null);
    setShowMenu(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <span>Auto</span>Drive
        </div>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/sell-car">Sell Car</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="cart-wrapper">
          <div onClick={() => navigate("/cart")} className="cart-icon-container">
            <FiShoppingCart className="cart-icon" />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          {!user ? (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          ) : (
            <div className="user-chip" onClick={() => setShowMenu((s) => !s)}>
              <div className="user-avatar">{initials}</div>
              {showMenu && (
                <div className="user-menu">
                  <Link to="/profile" onClick={() => setShowMenu(false)}>Profile</Link>
                  {user.role !== 'admin' && (
                    <Link to="/my-bookings" onClick={() => setShowMenu(false)}>My Bookings</Link>
                  )}
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
    </>
  );
};

export default Header;
