import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBoard } from '../../store/board'
import '../css/Create.css'
import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class PickBlackSquareModal extends Component {
  constructor(props) {
    super(props)

    this.state = { blackSquareBoards: [] }
  }

  handleClick = () => {
    this.props.displayModal()
  }

  setBlackSquareBoard = (board) => {
      this.props.getBoard(board)
  }

  async componentDidMount() {
    const { boardSize } = this.props
    const COUNT = 5
    const res = await axios.get(
      `${API_URL}/api/blackSquareTemplates?boardSize=${boardSize}&count=${COUNT}`
    )
    const blackSquareBoards = await res.data
    console.log(blackSquareBoards)
    this.setState({ blackSquareBoards })
  }

  render = () => {
      const { blackSquareBoards } = this.state

    return (
      <div className="PickBlackSquareModal">
        <div>Pick a black square:</div>
        <div> 
            {blackSquareBoards.map((board, idx) => <div><button onClick={()=> this.setBlackSquareBoard(board.crossword.board)}>{idx}</button></div>)}
        </div>
        <button onClick={() => this.handleClick()}>Enter</button>
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
PickBlackSquareModal.propTypes = {}
