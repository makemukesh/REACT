import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import VerifyOtp from './pages/verifyOtp'
import Profile from './pages/Profile'
import AdminDashboard from './admin/AdminDashboard'
import CarsManagement from './admin/CarsManagement'
import AddCar from './admin/AddCar'
import EditCar from './admin/EditCar'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { Routes, Route, useLocation } from 'react-router-dom'

import ProtectRoute from './components/ProtectRoute'
import Footer from './components/Footer'

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
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

        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
