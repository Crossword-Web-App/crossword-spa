import React, { Component } from 'react'
import { connect } from 'react-redux'
import PickSizeModal from './PickSizeModal'
import PickBlackSquareModal from './PickBlackSquareModal'
import PickSymmetryModal from './PickSymmetryModal'
import Create from './Create'

class CreateOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sizeModal: true,
      blackSquareModal: false,
      symmetryModal: false
    }
  }

  displayModal(modalName) {
    const nextState = {
      sizeModal: false,
      blackSquareModal: false,
      symmetryModal: false
    }
    if (modalName != 'closeModal') nextState[modalName] = true
    this.setState(nextState)
  }

  componentDidMount() {}

  render = () => {
    const { sizeModal, blackSquareModal, symmetryModal } = this.state

    return (
      <div>
        <Create />
        {sizeModal && (
          <PickSizeModal
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

const mapState = ({}) => ({})

const mapDispatch = {}

export default connect(
  mapState,
  mapDispatch
)(CreateOptions)
