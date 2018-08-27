import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Home'
import './css/App.css'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <NavBar />
        {/* <Routes /> */}
        <Route exact path="/login" component={Home} />
        <Route exact path="/signup" component={Home} />
        <Route exact path="/autoplay" component={Home} />
        <Route exact path="/create" component={Home} />
        <Route exact path="/login" component={Home} />
        <Route exact path="/browse" component={Home} />
        {/* Displays our Splash component as a fallback */}
        <Route component={Home} />
      </div>
    )
  }
}



export default connect()(App)
