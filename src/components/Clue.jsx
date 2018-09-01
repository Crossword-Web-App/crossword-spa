import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    const {
      clue,
      board,
      selectClueSquare,
      panel,
      direction,
      changeDirection
    } = this.props
    let square = { row: 0, column: 0 }
    event.preventDefault()
    board.forEach((row, rowIdx) => {
      row.forEach((_, columnIdx) => {
        if (board[rowIdx][columnIdx].number === clue.clueId) {
          square = { row: rowIdx, column: columnIdx }
        }
      })
    })
    selectClueSquare(square)

    if (panel !== direction) changeDirection()
  }

  componentDidMount = () => {
    const { getNewYOffset } = this.props
    this.yOffset = getNewYOffset(this.clientHeight)
  }

  render = () => {
    const {
      clue,
      selectedClue,
      selectedAltClue,
      direction,
      panel,
      changeScrollHeight
    } = this.props
    let className = 'CluesPanel-Clue'
    let altSelectedClassName = 'CluesPanel-Deselected-Clue-Alt'

    if (clue.clueId === selectedClue && direction === panel) {
      className += ' CluesPanel-Selected-Clue'
      changeScrollHeight(this.yOffset, this.clientHeight)
    }

    if (clue.clueId === selectedAltClue && direction !== panel) {
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
          {`${clue.clueId}.${clue.clue}`}
        </div>
      </div>
    )
  }
}

Clue.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string,
        entry: PropTypes.string,
        number: PropTypes.number.isRequired,
        blackSquare: PropTypes.bool.isRequired,
        isChecked: PropTypes.bool.isRequired,
        displayWrong: PropTypes.bool.isRequired,
        isRevealed: PropTypes.bool.isRequired,
        className: PropTypes.string.isRequired,
        numberClassName: PropTypes.string.isRequired,
        inputClassName: PropTypes.string.isRequired,
        noEditInputClassName: PropTypes.string.isRequired
      })
    )
  ).isRequired,
  clue: PropTypes.shape({
    clueId: PropTypes.number.isRequired,
    clue: PropTypes.string.isRequired,
  }).isRequired,
  selectedClue: PropTypes.number.isRequired,
  selectedAltClue: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  panel: PropTypes.string.isRequired,
  selectClueSquare: PropTypes.func.isRequired,
  changeDirection: PropTypes.func.isRequired,
  changeScrollHeight: PropTypes.func.isRequired,
  getNewYOffset: PropTypes.func.isRequired
}

const mapState = ({ board }) => ({ board })

const mapDispatch = { selectClueSquare, changeDirection }

export default connect(
  mapState,
  mapDispatch
)(Clue)
