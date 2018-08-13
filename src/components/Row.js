import React, { Component } from 'react'
import Square from './Square'
import './css/Row.css'

class Row extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: [0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }

  render() {
    return (
      <div className="Row">
        {this.state.squares.map((square, idx) => (
          <Square key={idx} row={this.props.row} square={square} />
        ))}
      </div>
    )
  }
}
export default Row
