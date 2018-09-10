import React from 'react'
import { Link } from 'react-router-dom'
import './css/NavBar.css'

const NavBar = () => (

  <header>
    <div id="title">
      <Link to="/">Crosswords</Link>
    </div>
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
        <a href="/">Logout</a>
      </div>
      <div className="nav-item">
        <Link to="/login">Login</Link>
      </div>

    </nav>
  </header>
)

export default NavBar
