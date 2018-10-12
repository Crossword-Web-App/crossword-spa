import React from 'react'
import { connect } from 'react-redux'
import Square from './Square'
import getBoard from '../store/board'


  // gets the ordinal number of the square going across/down rows
const getSequentialPosition = square => {
    return square.row * (9) + square.column
  }

const BoardGrid = ({ acceptsInput, board }) => (
  <div
  className="Board-Grid"
  onKeyDown={()=>console.log("bloop")}
  style={{
    gridTemplateColumns: `repeat(${board.length}, minmax(1em,1fr))`
  }}
>
  {board.map((row, rowIdx) => (
      row.map((square, columnIdx) => (
        <Square
          key={getSequentialPosition({
            row: rowIdx,
            column: columnIdx
          })}
          row={rowIdx}
          column={columnIdx}
          square={square}
          handleSquareClick={()=>console.log("bleep")}
          acceptsInput={acceptsInput}
        />
      ))
  ))}
</div>
)

const mapState = ({ board }) => ({
  board
})

const mapDispatch = {}

export default connect(
  mapState,
  mapDispatch
)(BoardGrid)
