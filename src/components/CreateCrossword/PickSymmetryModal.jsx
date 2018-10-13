import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBoardSize } from '../../store/create/boardSize'
import { getBoard } from '../../store/board'
import '../css/Create.css'

class PickSymmetryModal extends Component {
  handleClick = () => {
    const { displayModal } = this.props
    displayModal()
  }

  render = () => (
    <div className="Start-Modal-Container">
      <div className="Start-Modal">
        <div>Pick a symmetry:</div>
        <div className="Button-Container">
          <button type="submit" onClick={() => this.handleClick()}>
              Enter
          </button>
        </div>
      </div>
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
)(PickSymmetryModal)

/* PROP TYPES */
PickSymmetryModal.propTypes = {
  displayModal: PropTypes.func.isRequired
}
