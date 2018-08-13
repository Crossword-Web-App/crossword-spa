import React, { Component } from 'react'
import './css/Board.css'
import Row from './Row'

class Board extends Component {
  constructor() {
    super()
    this.state = {
      rows: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  render() {
    return (
      <div className="Board">
        {this.state.rows.map((row, idx) => <Row key={idx} row={idx} />)}
      </div>
    )
  }
}
export default Board
