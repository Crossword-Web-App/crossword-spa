import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutUser } from '../store/user'

const Account = ({ user, isLoggedIn, logoutUser }) =>
  isLoggedIn ? (
    <div className="Account">
      <div id="Account-Profile-Container">
        <img src={user.photo} alt={user.name} />
        {user.name}
        <button type="submit" onClick={logoutUser}>Logout</button>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  )

const mapState = ({ user }) => ({ user, isLoggedIn: !!user._id })

const mapDispatch = { logoutUser }

export default connect(mapState, mapDispatch)(Account)

Account.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    googleId: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
}
