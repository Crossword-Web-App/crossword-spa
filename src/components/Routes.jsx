import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Splash from './Splash'
import Game from './Game'
import PuzzleBrowser from './PuzzleBrowser'
import Account from './Account'
import ComingSoon from './ComingSoon'

class Routes extends Component {
  render = () => (
    <Switch>
      <Route exact path="/crossword/:id" component={Game} />
      <Route exact path="/autoplay" component={ComingSoon} />
      <Route exact path="/create" component={ComingSoon} />
      <Route exact path="/browse" component={PuzzleBrowser} />
      <Route exact path="/account" component={Account} />
      {/* Displays our Splash component as a fallback */}
      <Route component={Splash} />
    </Switch>
  )
}

export default withRouter(Routes)
