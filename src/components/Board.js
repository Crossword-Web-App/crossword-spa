import React, { Component } from 'react'
import { connect } from 'react-redux'
import Row from './Row'
import { checkSquare, checkBoard, revealSquare, revealBoard } from '../store/board'
import './css/Board.css'

class Board extends Component {
  constructor(props) {
    super(props)
  }

  handleCheckClick = () => {
    this.props.checkSquare(this.props.selectedSquare)
  }

  handleCheckBoardClick = () => {
    this.props.checkBoard()
  }

  handleRevealClick = () => {
    this.props.revealSquare(this.props.selectedSquare)
  }

  handleRevealBoardClick = () => {
    this.props.revealBoard()
  }

  render() {
    return (
      <div className="Board">
        {this.props.board.map((row, idx) => (
          <Row key={idx} row={idx} squares={row} />
        ))}
        <div>
          <button onClick={this.handleCheckClick}>Check</button>
          <button onClick={this.handleCheckBoardClick}>Check Board</button>
        </div>
        <div>
          <button onClick={this.handleRevealClick}>Reveal</button>
          <button onClick={this.handleRevealBoardClick}>Reveal Board</button>
        </div>
        <div>x More to go</div>
      </div>
    )
  }
}

const mapState = ({ board, selectedSquare }) => ({ board, selectedSquare })

const mapDispatch = { checkSquare, checkBoard, revealSquare, revealBoard }

export default connect(
  mapState,
  mapDispatch
)(Board)
