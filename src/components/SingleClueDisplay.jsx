import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectClueSquare } from '../store/clickedClueSquare'
import { changeDirection } from '../store/direction'
import './css/SingleClueDisplay.css'
import leftArrowButton from './icons/arrow-left.svg'
import rightArrowButton from './icons/arrow-right.svg'

class SingleClueDisplay extends Component {
  shouldComponentUpdate = prevProps => {
    const { selectedClue, acceptsInput } = this.props
    if (
      selectedClue !== prevProps.selectedClue ||
      acceptsInput !== prevProps.acceptsInput
    ) {
      return true
    }
    return false
  }

  getClueText = () => {
    const { direction, clues, selectedClue } = this.props
    const clueBody = clues[direction].filter(
      clue => clue.clueId === selectedClue
    )[0].clue
    return `${selectedClue}. ${clueBody}`
  }

  getPrevClue = () => {
    const {
      selectClueSquare,
      changeDirection,
      direction,
      clues,
      selectedClue,
      gameState
    } = this.props

    // only select new clue square if game is in progress or over
    if (!(gameState === 'preGame' || gameState === 'paused')) {
      let nextClueId = selectedClue

      // if first clue in a particular direction, change direction
      // and select the last clue of alt direction array
      if (clues[direction][0].clueId === selectedClue) {
        const nextDirection = direction === 'across' ? 'down' : 'across'
        nextClueId =
          clues[nextDirection][clues[nextDirection].length - 1].clueId
        changeDirection()
      } else {
        // convert clues into ids and choose the highest number less
        // than selected
        nextClueId = clues[direction]
          .map(clue => clue.clueId)
          .filter(clueId => clueId < selectedClue)
          .sort((a, b) => b - a)[0]
      }

      selectClueSquare(this.getBoardSquareFromClueId(nextClueId))
    }
  }

  getNextClue = () => {
    const {
      selectClueSquare,
      changeDirection,
      direction,
      clues,
      selectedClue,
      gameState
    } = this.props

    // only select new clue square if game is in progress or over
    if (!(gameState === 'preGame' || gameState === 'paused')) {
      let nextClueId = selectedClue

      // if last clues in a particular direction, change direction
      // and select the first clue of alt direction array
      if (
        clues[direction][clues[direction].length - 1].clueId === selectedClue
      ) {
        nextClueId = clues[direction === 'across' ? 'down' : 'across'][0].clueId
        changeDirection()
      } else {
        // convert clues into ids and choose the smallest number greater
        // than selected
        nextClueId = clues[direction]
          .map(clue => clue.clueId)
          .filter(clueId => clueId > selectedClue)
          .sort((a, b) => a - b)[0]
      }

      selectClueSquare(this.getBoardSquareFromClueId(nextClueId))
    }
  }

  getBoardSquareFromClueId = clueId => {
    // get the square location within the board
    const { board } = this.props
    let square = { row: 0, column: 0 }
    board.forEach((row, rowIdx) => {
      row.forEach((_, columnIdx) => {
        if (board[rowIdx][columnIdx].number === clueId) {
          square = { row: rowIdx, column: columnIdx }
        }
      })
    })
    return square
  }
  render = () => {
    const { acceptsInput } = this.props
    return (
      <div
        className="SingleClueDisplay"
        style={acceptsInput ? noBlurStyle : {}}
      >
        <div className="SingleClueDisplay-Arrow" onClick={this.getPrevClue}>
          <img src={leftArrowButton} alt="Previous Clue" />
        </div>
        <div className="SingleClueDisplay-SelectedClue">
          {this.getClueText()}
        </div>
        <div className="SingleClueDisplay-Arrow" onClick={this.getNextClue}>
          <img src={rightArrowButton} alt="Next Clue" />
        </div>
      </div>
    )
  }
}

const noBlurStyle = {
  filter: 'blur(0px) grayscale(0%)'
}

const mapState = ({ direction, clues, selectedClue, board, gameState }) => ({
  direction,
  clues,
  selectedClue,
  board,
  gameState,
  acceptsInput: gameState !== 'preGame' && gameState !== 'paused'
})

const mapDispatch = { selectClueSquare, changeDirection }

export default connect(
  mapState,
  mapDispatch
)(SingleClueDisplay)
