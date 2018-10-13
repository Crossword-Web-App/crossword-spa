import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateBoard from './CreateBoard'
import PickSizeModal from './PickSizeModal'
import PickBlackSquareModal from './PickBlackSquareModal'
import PickSymmetryModal from './PickSymmetryModal'
import { getBoard } from '../../store/board'
import '../css/Create.css'

class CreateOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sizeModal: true,
      blackSquareModal: false,
      symmetryModal: false
    }

    // default size of board
    this.DEFAULT_SIZE = 15
  }

  componentDidMount() {
    const { getBoard } = this.props
    getBoard(this.createEmptyBoard())
  }

  createEmptyBoard(num) {
    const length = num || this.DEFAULT_SIZE
    const board = Array.from({ length }, () =>
      Array.from({ length}, () => ({ letter: '', number: 0 }))
    )
    return board
  }

  displayModal(modalName) {
    const nextState = {
      sizeModal: false,
      blackSquareModal: false,
      symmetryModal: false
    }
    if (modalName !== 'closeModal') nextState[modalName] = true
    this.setState(nextState)
  }

  render = () => {
    const { sizeModal, blackSquareModal, symmetryModal } = this.state

    return (
      <div className="Create">
        <CreateBoard />
        {sizeModal && (
          <PickSizeModal
            createEmptyBoard={this.createEmptyBoard}
            displayModal={() => this.displayModal('blackSquareModal')}
          />
        )}
        {blackSquareModal && (
          <PickBlackSquareModal
            displayModal={() => this.displayModal('symmetryModal')}
          />
        )}
        {symmetryModal && (
          <PickSymmetryModal
            displayModal={() => this.displayModal('closeModal')}
          />
        )}
      </div>
    )
  }
}

const mapDispatch = { getBoard }

export default connect(
  null,
  mapDispatch
)(CreateOptions)

CreateOptions.propTypes = {
  getBoard: PropTypes.func.isRequired
}
