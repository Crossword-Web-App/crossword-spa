import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBoardSize } from '../../store/create/boardSize'
import { getBoard } from '../../store/board'
import '../css/Create.css'
import { setSymmetry } from '../../store/create/symmetry'

class PickSymmetryModal extends Component {
  handleClick = symmetry => {
    const { displayModal, setSymmetry } = this.props
    displayModal()
    setSymmetry(symmetry)
  }

  render = () => (
    <div className="Create-Modal">
      <div>Pick a symmetry:</div>
      <div className="Button-Container">
        <button onClick={() => this.handleClick('rotational')}>
          Rotational
        </button>
        <button onClick={() => this.handleClick('horizontal')}>
          Horizontal
        </button>
        <button onClick={() => this.handleClick('vertical')}>Vertical</button>
        <button onClick={() => this.handleClick('freestyle')}>
          No enforced symmetry
        </button>
      </div>
    </div>
  )
}

const mapState = ({ user, boardId }) => ({
  user,
  boardId
})

const mapDispatch = { setBoardSize, getBoard, setSymmetry }

export default connect(
  mapState,
  mapDispatch
)(PickSymmetryModal)

/* PROP TYPES */
PickSymmetryModal.propTypes = {
  displayModal: PropTypes.func.isRequired
}
