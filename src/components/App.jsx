import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import Routes from './Routes'
import './css/App.css'

const App = () => (
  <div className="App-Container">
    <NavBar />
    <Routes />
  </div>
)

export default withRouter(connect()(App))
