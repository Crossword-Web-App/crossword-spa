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

class AnswerPanel extends Component {
  constructor(props) {
    super(props)

    this.buttonRefs = {}
  }

  // Event handlers
  handleCheckClick = () => {
    const { checkSquare, selectedSquare} = this.props
    checkSquare(selectedSquare)
  }

  handleCheckBoardClick = () => {
    const { checkBoard } = this.props
    checkBoard()
  }

  handleRevealClick = () => {
    const { revealSquare, selectedSquare} = this.props
    revealSquare(selectedSquare)
  }

  handleRevealBoardClick = () => {
    const { revealBoard } = this.props
    revealBoard()
  }

  displayCheckButtons = () => {
    this.buttonRefs.checkSquare.style.color = 'black'
    this.buttonRefs.checkSquare.style.height = '2em'
    this.buttonRefs.checkBoard.style.color = 'black'
    this.buttonRefs.checkBoard.style.height = '2em'
  }

  displayRevealButtons = () => {
    this.buttonRefs.revealSquare.style.color = 'black'
    this.buttonRefs.revealSquare.style.height = '2em'
    this.buttonRefs.revealBoard.style.color = 'black'
    this.buttonRefs.revealBoard.style.height = '2em'
  }

  render = () => (
    <div className="AnswerPanel">
      <div className="AnswerPanel-Section">
        <div className="AnswerPanel-Header" />
        <div className="AnswerPanel-Type" onClick={this.displayCheckButtons}>
          Check
        </div>
        <div
          className="AnswerPanel-Hidden"
          onClick={this.handleCheckClick}
          ref={ref => {
            this.buttonRefs.checkSquare = ref
          }}
        >
          Check Square
        </div>
        <div
          className="AnswerPanel-Hidden"
          onClick={this.handleCheckBoardClick}
          ref={ref => {
            this.buttonRefs.checkBoard = ref
          }}
        >
          Check Board
        </div>
        <div className="AnswerPanel-Type" onClick={this.displayRevealButtons}>
          Reveal
        </div>
        <div
          className="AnswerPanel-Hidden"
          onClick={this.handleRevealClick}
          ref={ref => {
            this.buttonRefs.revealSquare = ref
          }}
        >
          Reveal Square
        </div>
        <div
          className="AnswerPanel-Hidden"
          onClick={this.handleRevealBoardClick}
          ref={ref => {
            this.buttonRefs.revealBoard = ref
          }}
        >
          Reveal Board
        </div>
      </div>
    </div>
  )
}

AnswerPanel.propTypes = {
  selectedSquare: PropTypes.shape({
    row: PropTypes.number,
    column: PropTypes.number
  }).isRequired,
  checkSquare: PropTypes.func.isRequired,
  checkBoard: PropTypes.func.isRequired,
  revealSquare: PropTypes.func.isRequired,
  revealBoard: PropTypes.func.isRequired,
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
