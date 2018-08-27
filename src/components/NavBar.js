import React from 'react'
import { Link } from 'react-router-dom'
import './css/Navbar.css'

const Navbar = () => (

  <header>
    <div id="title">Crosswords</div>
    <nav>
      <div className="nav-item">
        <Link to="/autoplay">AutoPlay</Link>
      </div>
      <div className="nav-item">
        <Link to="/create">Create</Link>
      </div>
      <div className="nav-item">
        <Link to="/browse">Browse</Link>
      </div>
      <div className="nav-item">
        <a href="/home">Logout</a>
      </div>
      <div className="nav-item">
        <Link to="/login">Login</Link>
      </div>

    </nav>
  </header>
)

export default Navbar
