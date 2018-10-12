import React, { Component } from 'react'
import Board from '../Board'
import { getBoard } from '../../store/board'
import BoardGrid from '../BoardGrid'
import Square from '../Square'

import { connect } from 'react-redux'

class Create extends Component {
  constructor(props) {
    super(props)

    // allows focus on change events
    this.squareInputRefs = []
  }

  componentDidMount() {
    const { getBoard } = this.props
    getBoard(this.createEmptyBoard(10))
  }

  createEmptyBoard(num) {
    let emptysquare = { entry: '', letter: '', number: 0 }
    let board = Array(num)
    let answer = board.fill(Array.from({length: num}, () => emptysquare))
    return answer
  }

  render = () => {
    return (<div style={{height: '100%', width: '100%', marginTop: '5em', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <BoardGrid /> 

      </div>
    )
  }
}

const mapState = ({ board }) => ({
  board
})


const mapDispatch = {
  getBoard
}

export default connect(
  mapState,
  mapDispatch
)(Create)
