import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Splash from './Splash'
import Game from './Game'
import PuzzleBrowser from './PuzzleBrowser'
import Account from './Account'
import ComingSoon from './ComingSoon'
import { fetchUser } from '../store/user'

class Routes extends Component {
  async componentDidMount() {
    const { fetchUser } = this.props
    await fetchUser()
  }

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

const mapDispach = {
  fetchUser
}

export default withRouter(
  connect(
    null,
    mapDispach
  )(Routes)
)

Routes.propTypes = {
  fetchUser: PropTypes.func.isRequired
}