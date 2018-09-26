import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import Routes from './Routes'
import { fetchUser } from '../store/user'
import './css/App.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    const { fetchUser } = this.props

    await fetchUser()
    this.setState({ isLoading: false})
  }

  render = () => (
    this.state.isLoading
      ? <div></div>
      : (<div className="App-Container">
          <NavBar />
          <Routes />
        </div>)
  )
}

const mapDispatch = {
  fetchUser
}

export default withRouter(connect(null, mapDispatch)(App))

/* PROP TYPES */
Routes.propTypes = {
  fetchUser: PropTypes.func
}
