import React, { Component } from 'react'
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

      // console.log('yOffset', yOffset)
      // console.log('this.clueBody.scrollTop', this.clueBody.scrollTop)

      // "above" visble portion of scroll div
      if (yOffset < this.clueBody.scrollTop) {
        this.clueBody.scrollTop = yOffset
        // this.marginTop='0px'
        // this.height = this.clueBody.scrollTop - yOffset
      }

      // "below" visble portion of scroll div
      if (yOffset > this.clueBody.scrollTop + this.clueBody.clientHeight - clueHeight) {
        this.clueBody.scrollTop = yOffset
        // this.marginTop = `${-yOffset}px`
        // this.height = yOffset
        // console.log('yOffset', yOffset)
        // console.log('this.clueBody.style.height', this.clueBody.style.height)
      }

    }
  }

  getNewYOffset = clientHeight => {
    this.yOffset += clientHeight
    return this.yOffset - clientHeight
  }

  render = () => {
    const { clues, dir, direction, selectedClue, selectedAltClue } = this.props
    console.log(clues === true)
    return (Object.keys(clues).length ? 
      <div className="CluesPanel-Column-Container">
        <div className="CluesPanel-Header">
          <div className="CluesPanel-Header-Text">{dir}</div>
        </div>
        <div
          className="CluesPanel-Clues-Body"
          // style={{marginTop: this.marginTop, height: `calc(45em + ${this.height}px`}}
          ref={ref => (this.clueBody = ref)}
        >
          {clues[dir].map(clue => (
            <Clue
              key={clue.clueId}
              clue={clue}
              dir={dir}
              direction={direction}
              selectedClue={selectedClue}
              selectedAltClue={selectedAltClue}
              getNewYOffset={this.getNewYOffset}
              changeScrollHeight={this.changeScrollHeight}
            />
          ))}
        </div>
      </div> : <div></div>
    )
  }
}

const mapState = ({ clues, selectedClue, selectedAltClue, direction }) => ({
  clues,
  selectedClue,
  selectedAltClue,
  direction
})

export default connect(
  mapState,
  null
)(CluesColumn)
