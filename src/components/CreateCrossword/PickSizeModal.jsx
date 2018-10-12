import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBoardSize } from '../../store/create/boardSize'
import { getBoard } from '../../store/board'
import '../css/Create.css'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class PickSizeModal extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = num => {
    const { getBoard, setBoardSize } = this.props
    setBoardSize(num)
    getBoard(this.createEmptyBoard(num))
  }

  confirmSize = () => {
    this.props.displayModal()
  }

  createEmptyBoard(num) {
    let emptysquare = { entry: '', letter: '', number: 0 }
    let board = Array(num)
    let answer = board.fill(Array.from({ length: num }, () => emptysquare))
    return answer
  }

  render = () => {
    return (
      <div className="Start-Modal-Container">
        <div className="Start-Modal">
          <div>Pick a crossword size:</div>
          <div className="Button-Container">
            <button onClick={() => this.handleClick(15)}>15x15</button>
            <button onClick={() => this.handleClick(21)}>21x21</button>
            <button onClick={() => this.handleClick(25)}>25x25</button>
            <button onClick={() => this.confirmSize()}>Enter</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ user, boardId }) => ({
  user,
  boardId
})

const mapDispatch = { setBoardSize, getBoard }

export default connect(
  mapState,
  mapDispatch
)(PickSizeModal)

/* PROP TYPES */
PickSizeModal.propTypes = {}
