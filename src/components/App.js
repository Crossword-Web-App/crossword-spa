import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from './Board'
import CluesPanel from './CluesPanel'
import Timer from './Timer'
import { loadBoard } from '../store/board'
import './css/App.css'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { loadBoard } = this.props
    const board = loadBoard()
  }

  render() {
    return (
      <div className="App">
        <Board />
        <CluesPanel />
        <Timer />
      </div>
    )
  }
}

const mapState = ({ board }) => ({ board })

const mapDispatch = { loadBoard }

export default connect(
  mapState,
  mapDispatch
)(App)
