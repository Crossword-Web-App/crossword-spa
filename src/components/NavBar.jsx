import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import getRandomPuzzleId from '../utilities/getRandomPuzzleId'
import './css/NavBar.css'

const API_URL = process.env.API_URL || 'http://localhost:8080'

const NavBar = ({ user, isLoggedIn }) => (
  <header>
    <div id="title">
      <Link to="/">Crosswords</Link>
    </div>
    <nav>
      <div className="nav-item">
        <Link to={`/crossword/${getRandomPuzzleId()}`}>Random</Link>
      </div>
      <div className="nav-item">
        <Link to="/browse">Browse</Link>
      </div>
      <div className="nav-item">
        <Link to="/create">Create</Link>
      </div>
      {isLoggedIn && user && user.photo && user.name ? (
        <div className="nav-item" id="img-item">
          <Link to="/account" id="img-link">
            <img src={user.photo} alt={user.name} />
          </Link>
        </div>
      ) : (
        <div className="nav-item">
          <a href={`${API_URL}/auth/google`}>Login</a>
        </div>
      )}
    </nav>
  </header>
)

const mapState = ({ user }) => ({
  user,
  isLoggedIn: !!user._id
})

export default withRouter(connect(mapState)(NavBar))

NavBar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    googleId: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
