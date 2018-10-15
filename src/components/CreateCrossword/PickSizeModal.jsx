import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBoardSize } from '../../store/create/boardSize'
import { getBoard } from '../../store/board'
import '../css/Create.css'

class PickSizeModal extends Component {
  handleClick = num => {
    const { getBoard, setBoardSize, createEmptyBoard } = this.props
    setBoardSize(num)
    getBoard(createEmptyBoard(num))
  }

  confirmSize = () => {
    const { displayModal } = this.props
    displayModal()
  }

  render = () => (
    <div className="Create-Modal">
      <div>Pick a crossword size:</div>
      <div className="Button-Container">
        <button type="button" onClick={() => this.handleClick(15)}>
          15x15
        </button>
        <button type="button" onClick={() => this.handleClick(21)}>
          21x21
        </button>
        <button type="button" onClick={() => this.handleClick(25)}>
          25x25
        </button>
      </div>
      <button type="submit" onClick={() => this.confirmSize()}>
        Enter
      </button>
    </div>
  )
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
PickSizeModal.propTypes = {
  getBoard: PropTypes.func.isRequired,
  setBoardSize: PropTypes.func.isRequired,
  createEmptyBoard: PropTypes.func.isRequired,
  displayModal: PropTypes.func.isRequired
}
