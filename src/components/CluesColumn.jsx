import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Clue from './Clue'

class CluesColumn extends Component {
  constructor(props) {
    super(props)

    this.yOffset = 0
    this.clueBody = null
    this.marginTop = 0
    this.height = 0
  }

  changeScrollHeight = (yOffset, clueHeight) => {
    if (this.clueBody) {
      // "above" visble portion of scroll div
      if (yOffset < this.clueBody.scrollTop) {
        this.clueBody.scrollTop = yOffset
      }

      // "below" visble portion of scroll div
      if (
        yOffset >
        this.clueBody.scrollTop + this.clueBody.clientHeight - clueHeight
      ) {
        this.clueBody.scrollTop = yOffset
      }
    }
  }

  getNewYOffset = clientHeight => {
    this.yOffset += clientHeight
    return this.yOffset - clientHeight
  }

  render = () => {
    const {
      clues,
      panel,
      direction,
      selectedClue,
      selectedAltClue,
      gameState
    } = this.props
    return Object.keys(clues).length ? (
      <div className="CluesPanel-Column-Container">
        <div className="CluesPanel-Header">
          <div className="CluesPanel-Header-Text">{panel}</div>
        </div>
        <div
          className="CluesPanel-Clues-Body"
          ref={ref => {
            this.clueBody = ref
          }}
          style={
            gameState === 'preGame' || gameState === 'paused'
              ? noScrollStyle
              : {}
          }
        >
          {clues[panel].map(clue => (
            <Clue
              key={clue.clueId}
              clue={clue}
              panel={panel}
              direction={direction}
              selectedClue={selectedClue}
              selectedAltClue={selectedAltClue}
              getNewYOffset={this.getNewYOffset}
              changeScrollHeight={this.changeScrollHeight}
            />
          ))}
        </div>
      </div>
    ) : (
      <div />
    )
  }
}

const noScrollStyle = { overflow: 'hidden' }

const mapState = ({
  clues,
  selectedClue,
  selectedAltClue,
  direction,
  gameState
}) => ({
  clues,
  selectedClue,
  selectedAltClue,
  direction,
  gameState
})

export default connect(
  mapState,
  null
)(CluesColumn)


/* PROP TYPES */
CluesColumn.propTypes = {
  clues: PropTypes.shape({
    across: PropTypes.arrayOf(
      PropTypes.shape({
        clueId: PropTypes.number.isRequired,
        clue: PropTypes.string.isRequired
      })
    ),
    down: PropTypes.arrayOf(
      PropTypes.shape({
        clueId: PropTypes.number.isRequired,
        clue: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  selectedClue: PropTypes.number.isRequired,
  selectedAltClue: PropTypes.number.isRequired,
  panel: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired
}
