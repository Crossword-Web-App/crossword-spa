import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBoardSize } from '../../store/create/boardSize'
import { getBoard } from '../../store/board'
import '../css/Create.css'


const API_URL = process.env.API_URL || 'http://localhost:8080'

class PickBlackSquareModal extends Component {

  handleClick = () => {
   this.props.displayModal()
  }

  render = () => {
    return (
      <div
        className="Start-Modal-Container"
      >
        <div className="Start-Modal">
          <div>Pick a black square:</div>
          <div className="Button-Container">
          <button onClick={()=>this.handleClick()}>Enter</button>
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
)(PickBlackSquareModal)

/* PROP TYPES */
PickBlackSquareModal.propTypes = {
}