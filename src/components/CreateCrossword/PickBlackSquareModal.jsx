import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { getBoard } from '../../store/board'
import '../css/Create.css'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class PickBlackSquareModal extends Component {
  constructor(props) {
    super(props)

    this.state = { blackSquareBoards: [] }
  }

  async componentDidMount() {
    const { boardSize } = this.props
    const COUNT = 5
    const res = await axios.get(
      `${API_URL}/api/blackSquareTemplates?boardSize=${boardSize}&count=${COUNT}`
    )
    const blackSquareBoards = await res.data
    this.setState({ blackSquareBoards })
  }

  handleClick = () => {
    const { displayModal } = this.props
    displayModal()
  }

  setBlackSquaresOnBoard = board => {
    const { getBoard } = this.props
    getBoard(board)
  }

  render = () => {
    const { blackSquareBoards } = this.state

    return (
      <div className="PickBlackSquareModal">
        <div>Pick a black square:</div>
        <div>
          {blackSquareBoards.map((board, idx) => (
            <div>
              <button
                type="button"
                onClick={() =>
                  this.setBlackSquareOnBoard(board.crossword.board)
                }
              >
                {idx}
              </button>
            </div>
          ))}
        </div>
        <button type="submit" onClick={() => this.handleClick()}>
          Enter
        </button>
      </div>
    )
  }
}

const mapState = ({ boardSize }) => ({
  boardSize
})

const mapDispatch = { getBoard }

export default connect(
  mapState,
  mapDispatch
)(PickBlackSquareModal)

/* PROP TYPES */
PickBlackSquareModal.propTypes = {
  getBoard: PropTypes.func.isRequired,
  displayModal: PropTypes.func.isRequired
}
