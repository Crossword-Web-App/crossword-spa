import React, { Component } from 'react'
import ArrowPanel from './ArrowPanel'
import Puzzle from './Puzzle'

class PuzzlesSection extends Component {
  constructor() {
    super()

    this.fillerStyle = { flexBasis: '18em', flexGrow: 1, flexShrink: 1 }

    this.state = {
      page: 0,
      lastPage: 0,
      puzzleCount: 0,
      fillers: []
    }
  }

  // click handlers
  handleRightArrowClick = () => {
    const { page, lastPage } = this.state
    this.setState({ page: page + 1 <= lastPage ? page + 1 : lastPage })
  }

  handleLeftArrowClick = () => {
    const { page } = this.state
    this.setState({ page: page - 1 >= 0 ? page - 1 : 0 })
  }

  // convenience functions to determine whether pages to left or right exist
  showRightArrow = () => {
    const { puzzleCount, page } = this.state
    return puzzleCount > (page + 1) * 5
  }

  showLeftArrow = () => {
    const { page } = this.state
    return page > 0
  }

  componentDidUpdate = prevProps => {
    const { crosswords } = this.props
    let fillers = []
    let lastPage = 0

    if (prevProps.crosswords.length !== crosswords.length) {
      // set lastPage
      lastPage =
        crosswords.length % 5 === 0
          ? crosswords.length / 5 - 1
          : Math.floor(crosswords.length / 5)

      // add fillers if fewer than 5 crosswords on last page of crosswords
      for (
        let i = 0;
        i < 5 - (crosswords.length % 5 > 0 ? crosswords.length % 5 : 5);
        i++
      ) {
        fillers.push('filler' + i)
      }

      this.setState({ fillers, lastPage, puzzleCount: crosswords.length })
    }
  }

  render = () => {
    const { page, fillers, lastPage } = this.state
    const { crosswords, title } = this.props
    return (
      <div className="PuzzleBrowser-Section">
        <div className="PuzzleBrowser-Section-Title">{title}</div>
        <div className="PuzzleBrowser-Section-Container">
          <ArrowPanel
            direction="left"
            showArrow={this.showLeftArrow()}
            handleClick={this.handleLeftArrowClick}
          />
          <div className="PuzzleBrowser-Puzzle-Container">
            {crosswords.slice(page * 5, (page + 1) * 5).map(crossword => (
              <Puzzle key={crossword.id} crossword={crossword} />
            ))}
            {page === lastPage &&
              fillers.map(filler => (
                <div style={this.fillerStyle} key={filler} />
              ))}
          </div>
          <ArrowPanel
            direction="right"
            showArrow={this.showRightArrow()}
            handleClick={this.handleRightArrowClick}
          />
        </div>
      </div>
    )
  }
}

export default PuzzlesSection
