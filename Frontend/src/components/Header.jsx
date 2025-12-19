import React from 'react'
import { Link } from 'react-router-dom'
import index from '../index.css'

const Header = () => {
  return (

    <div>  <nav className="Header">
      <h1>Welcome to  MyApp..!</h1>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Services">Services</Link>

    </nav>    
    </div>
  )
}

export default Header