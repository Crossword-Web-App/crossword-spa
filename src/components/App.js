import React, { Component } from "react"
import Board from "./Board"
import "./css/App.css"
import { connect } from "react-redux"
import { loadBoard } from "../store/board"

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
