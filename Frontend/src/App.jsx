import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import VerifyOtp from './pages/verifyOtp'
import Profile from './pages/Profile'
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom'

=======
import AdminDashboard from './admin/AdminDashboard'
import CarsManagement from './admin/CarsManagement'
import AddCar from './admin/AddCar'
import EditCar from './admin/EditCar'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer'

>>>>>>> 699a03d (inital deployment)
const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
      </Routes>
=======
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<CarsManagement />} />
        <Route path="/admin/add" element={<AddCar />} />
        <Route path="/admin/edit/:id" element={<EditCar />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
      <Footer />
>>>>>>> 699a03d (inital deployment)
    </>
  )
}

export default App
