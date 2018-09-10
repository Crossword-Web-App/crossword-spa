import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  checkSquare,
  checkBoard,
  revealSquare,
  revealBoard
} from '../store/board'
import './css/AnswerPanel.css'
import gearButton from './icons/gear.svg'

class AnswerPanel extends Component {
  constructor(props) {
    super(props)

    this.buttonRefs = {}
  }

  // Event handlers
  handleCheckClick = () => {
    const { checkSquare, selectedSquare } = this.props
    if (
      this.buttonRefs.checkSquare.className.includes('AnswerPanel-Revealed')
    ) {
      checkSquare(selectedSquare)
    }
  }

  handleCheckBoardClick = () => {
    const { checkBoard } = this.props
    if (this.buttonRefs.checkBoard.className.includes('AnswerPanel-Revealed')) {
      checkBoard()
    }
  }

  handleRevealClick = () => {
    const { revealSquare, selectedSquare } = this.props
    if (
      this.buttonRefs.revealSquare.className.includes('AnswerPanel-Revealed')
    ) {
      revealSquare(selectedSquare)
    }
  }

  handleRevealBoardClick = () => {
    const { revealBoard } = this.props
    if (
      this.buttonRefs.revealSquare.className.includes('AnswerPanel-Revealed')
    ) {
      revealBoard()
    }
  }

  toggleDisplayCheckButtons = () => {
    if (
      this.buttonRefs.checkSquare.className.includes('AnswerPanel-Revealed')
    ) {
      this.buttonRefs.checkSquare.className = 'AnswerPanel-Hidden'
      this.buttonRefs.checkBoard.className = 'AnswerPanel-Hidden'
    } else {
      this.buttonRefs.checkSquare.className += ' AnswerPanel-Revealed'
      this.buttonRefs.checkBoard.className += ' AnswerPanel-Revealed'
    }

    if (
      this.buttonRefs.revealSquare.className.includes('AnswerPanel-Revealed')
    ) {
      this.buttonRefs.revealSquare.className = 'AnswerPanel-Hidden'
      this.buttonRefs.revealBoard.className = 'AnswerPanel-Hidden'
    }
  }

  toggleDisplayRevealButtons = () => {
    if (
      this.buttonRefs.revealSquare.className.includes('AnswerPanel-Revealed')
    ) {
      this.buttonRefs.revealSquare.className = 'AnswerPanel-Hidden'
      this.buttonRefs.revealBoard.className = 'AnswerPanel-Hidden'
    } else {
      this.buttonRefs.revealSquare.className += ' AnswerPanel-Revealed'
      this.buttonRefs.revealBoard.className += ' AnswerPanel-Revealed'
    }

    if (
      this.buttonRefs.checkSquare.className.includes('AnswerPanel-Revealed')
    ) {
      this.buttonRefs.checkSquare.className = 'AnswerPanel-Hidden'
      this.buttonRefs.checkBoard.className = 'AnswerPanel-Hidden'
    }
  }

  render = () => {
    const { rowWidth } = this.props
    return (
      <div className="AnswerPanel" style={{ width: `${rowWidth * 2.25}em` }}>
        <img
          className="AnswerPanel-GearButton"
          src={gearButton}
          alt="Options"
        />
        <div className="AnswerPanel-DropDownContainer">
          <div
            className="AnswerPanel-Button"
            onClick={this.toggleDisplayCheckButtons}
          >
            Check
          </div>
          <div
            className="AnswerPanel-Hidden"
            onClick={this.handleCheckClick}
            ref={ref => {
              this.buttonRefs.checkSquare = ref
            }}
          >
            Square
          </div>
          <div
            className="AnswerPanel-Hidden"
            onClick={this.handleCheckBoardClick}
            ref={ref => {
              this.buttonRefs.checkBoard = ref
            }}
          >
            Board
          </div>
        </div>
        <div className="AnswerPanel-DropDownContainer">
          <div
            className="AnswerPanel-Button"
            onClick={this.toggleDisplayRevealButtons}
          >
            Reveal
          </div>
          <div
            className="AnswerPanel-Hidden"
            onClick={this.handleRevealClick}
            ref={ref => {
              this.buttonRefs.revealSquare = ref
            }}
          >
            Square
          </div>
          <div
            className="AnswerPanel-Hidden"
            onClick={this.handleRevealBoardClick}
            ref={ref => {
              this.buttonRefs.revealBoard = ref
            }}
          >
            Board
          </div>
        </div>
      </div>
    )
  }
}

AnswerPanel.propTypes = {
  rowWidth: PropTypes.number.isRequired,
  selectedSquare: PropTypes.shape({
    row: PropTypes.number,
    column: PropTypes.number
  }).isRequired,
  checkSquare: PropTypes.func.isRequired,
  checkBoard: PropTypes.func.isRequired,
  revealSquare: PropTypes.func.isRequired,
  revealBoard: PropTypes.func.isRequired
}

const mapState = ({ selectedSquare }) => ({ selectedSquare })

const mapDispatch = {
  checkSquare,
  checkBoard,
  revealSquare,
  revealBoard
}

export default connect(
  mapState,
  mapDispatch
)(AnswerPanel)
