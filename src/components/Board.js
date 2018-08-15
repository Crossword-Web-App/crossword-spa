import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from './Row'
import { revealSquare, checkSquare } from '../store/board'
import './css/Board.css'

class Board extends Component {
  constructor(props) {
    super(props)
  }

  handleRevealClick = () => {
    this.props.revealSquare(this.props.selectedSquare)
  }

  handleCheckClick = () => {
    this.props.checkSquare(this.props.selectedSquare)
  }

  render() {
    return (
      <div className="Board">
        {this.props.board.map((row, idx) => (
          <Row key={idx} row={idx} squares={row} />
        ))}
        <button onClick={this.handleCheckClick}>Check</button>
        <button onClick={this.handleRevealClick}>Reveal</button>
        <div>x More to go</div>
      </div>
    )
  }
}

const mapState = ({ board, selectedSquare }) => ({ board, selectedSquare })

const mapDispatch = { revealSquare, checkSquare }

export default connect(
  mapState,
  mapDispatch
)(Board)
