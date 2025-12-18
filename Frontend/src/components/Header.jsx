import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>

    <nav className="Header">
      <h1>Welcome to  MyApp..!</h1>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/services">Services</Link>
    </nav>    
    </div>
  )
}

export default Header