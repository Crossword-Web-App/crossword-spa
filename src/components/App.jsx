import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import NavBar from './NavBar'
import Game from './Game'
import ComingSoon from './ComingSoon'
import './css/App.css'

const App = () => (
  <div className="App-Container">
    <NavBar />
    {/* <Routes /> */}
    <Switch>
      <Route exact path="/login" component={ComingSoon} />
      <Route exact path="/signup" component={ComingSoon} />
      <Route exact path="/autoplay/:id" render={(props) => (<Game key={props.match.params.id} {...props} />) } />
      <Route exact path="/create" component={ComingSoon} />
      <Route exact path="/login" component={ComingSoon} />
      <Route exact path="/browse" component={ComingSoon} />
      {/* Displays our Splash component as a fallback */}
      <Route component={Game} />
    </Switch>
  </div>
)

export default withRouter(connect()(App))
