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
      <header className="sticky top-0 w-full h-[70px] bg-slate-900/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 md:px-15 z-[1000] shadow-sm">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-white tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-[#ff3d00]">Auto</span>Drive
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-7">
          <Link to="/" className="text-white/90 text-[15px] font-medium relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#ff3d00] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
          <Link to="/cars" className="text-white/90 text-[15px] font-medium relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#ff3d00] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Cars</Link>
          <Link to="/about" className="text-white/90 text-[15px] font-medium relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#ff3d00] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">About</Link>
          <Link to="/services" className="text-white/90 text-[15px] font-medium relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#ff3d00] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Services</Link>
          <Link to="/contact" className="text-white/90 text-[15px] font-medium relative hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#ff3d00] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Contact</Link>
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer text-white hover:text-[#ff3d00] transition-colors p-2"
          >
            <FiShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff3d00] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 items-center">
            {!user ? (
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-semibold rounded-md text-white border-2 border-white/60 bg-transparent hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Login
              </Link>
            ) : (
              <div
                className="flex items-center px-3 py-1.5 bg-white/10 border border-white/20 rounded-full cursor-pointer relative transition-all hover:bg-white/20"
                onClick={() => setShowMenu((s) => !s)}
              >
                <div className="w-8 h-8 rounded-full bg-[#ff3d00] text-white flex items-center justify-center font-semibold text-sm">
                  {initials}
                </div>
                {showMenu && (
                  <div className="absolute top-[120%] right-0 bg-white rounded-xl p-2.5 min-w-[160px] shadow-lg z-[1200] overflow-hidden">
                    <Link
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block w-full px-4 py-2.5 text-left text-slate-800 text-sm rounded-lg hover:bg-gray-100 hover:text-[#ff3d00] transition-colors"
                    >
                      Profile
                    </Link>
                    {user.role !== 'admin' && (
                      <Link
                        to="/my-bookings"
                        onClick={() => setShowMenu(false)}
                        className="block w-full px-4 py-2.5 text-left text-slate-800 text-sm rounded-lg hover:bg-gray-100 hover:text-[#ff3d00] transition-colors"
                      >
                        My Bookings
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setShowMenu(false)}
                        className="block w-full px-4 py-2.5 text-left text-slate-800 text-sm rounded-lg hover:bg-gray-100 hover:text-[#ff3d00] transition-colors"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2.5 text-left bg-transparent border-none text-slate-800 text-sm rounded-lg cursor-pointer hover:bg-gray-100 hover:text-[#ff3d00] transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
