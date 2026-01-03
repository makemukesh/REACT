import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import VerifyOtp from './pages/VerifyOtp'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import CarsManagement from './admin/CarsManagement'
import AddCar from './admin/AddCar'
import EditCar from './admin/EditCar'
import OrdersManagement from './admin/OrdersManagement'
import AdminMyBookings from './admin/AdminMyBookings'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import Cart from './pages/Cart'
import Checkout from './pages/CheckOut'
import Auth from './pages/Auth'
import MyOrders from './pages/MyOrders'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import { Routes, Route, useLocation } from 'react-router-dom'

import ProtectRoute from './components/ProtectRoute'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes wrapped in ProtectRoute */}
        <Route path="/admin" element={<ProtectRoute adminOnly={true}><AdminDashboard /></ProtectRoute>} />
        <Route path="/admin/cars" element={<ProtectRoute adminOnly={true}><CarsManagement /></ProtectRoute>} />
        <Route path="/admin/add" element={<ProtectRoute adminOnly={true}><AddCar /></ProtectRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectRoute adminOnly={true}><EditCar /></ProtectRoute>} />
        <Route path="/admin/orders" element={<ProtectRoute adminOnly={true}><OrdersManagement /></ProtectRoute>} />
        <Route path="/admin/my-bookings" element={<ProtectRoute adminOnly={true}><AdminMyBookings /></ProtectRoute>} />

        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-bookings" element={<ProtectRoute adminOnly={false}><MyOrders /></ProtectRoute>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
