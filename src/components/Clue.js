import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectClueSquare } from '../store/clickedClueSquare'
import { changeDirection } from '../store/direction'

class Clue extends Component {
  constructor(props) {
    super(props)

    this.clientHeight = 0
    this.yOffset = 0
  }

  handleClueClick = event => {
    const { clue, board, selectClueSquare, dir, direction, changeDirection } = this.props
    let square = { row: 0, column: 0 }
    event.preventDefault()
    board.forEach((row, rowIdx) => {
      row.forEach((_, columnIdx) => {
        // console.log('row', rowIdx, 'column', columnIdx)
        if (board[rowIdx][columnIdx]['number'] === clue.clueId) {
          console.log('lol', board[rowIdx][columnIdx]['number'])
          square = { row: rowIdx, column: columnIdx }
        }
      })
    })
    console.log('square', square)
    selectClueSquare(square)

    if (dir !== direction) changeDirection()
  }

  componentDidMount = () => {
    this.yOffset = this.props.getNewYOffset(this.clientHeight)
    // console.log('this.yOffset', this.yOffset)
  }

  render = () => {
    const {
      clue,
      selectedClue,
      selectedAltClue,
      direction,
      dir,
      changeScrollHeight
    } = this.props
    let className = 'CluesPanel-Clue'
    let altSelectedClassName = 'CluesPanel-Deselected-Clue-Alt'

    if (clue.clueId === selectedClue && direction === dir) {
      className += ' CluesPanel-Selected-Clue'
      changeScrollHeight(this.yOffset, this.clientHeight)
    }

    if (clue.clueId === selectedAltClue && direction !== dir) {
      altSelectedClassName = 'CluesPanel-Selected-Clue-Alt'
      changeScrollHeight(this.yOffset, this.clientHeight)
    }

    return (
      <div
        key={clue.clueId}
        className={className}
        onClick={this.handleClueClick}
        ref={ref => {
          if (ref) this.clientHeight = ref.clientHeight
        }}
      >
        <div className={altSelectedClassName} />
        <div
          style={{
            paddingLeft: '0.25em',
            flexBasis: '18em',
            flexGrow: '0'
          }}
        >
          {clue.clueId}. {clue.clue}
        </div>
      </div>
    )
  }
}

const mapState = ({ board }) => ({ board })

const mapDispatch = { selectClueSquare, changeDirection }

export default connect(
  mapState,
  mapDispatch
)(Clue)
