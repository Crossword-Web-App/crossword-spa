import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Puzzle from './PuzzleBrowser/Puzzle'
import getRandomPuzzleId from '../utilities/getRandomPuzzleId'
import './css/PuzzleBrowser.css'
import leftArrowButton from './icons/arrow-left.svg'
import rightArrowButton from './icons/arrow-right.svg'

const API_URL = process.env.API_URL || 'http://localhost:8080'

class PuzzleBrowser extends Component {
  constructor() {
    super()

    this.fillerStyle = { flexBasis: '18em', flexGrow: 1, flexShrink: 1 }

    this.state = {
      crosswords: [],
      randomCrosswords: [[], []],
      fillers: []
    }
  }

  async componentDidMount() {
    const { user } = this.props

    // get the user's recent incomplete crosswords
    try {
      if (user._id) {
        let res = await axios(`${API_URL}/api/users/${user._id}/all_crosswords`)
        let crosswords = await res.data
        crosswords.forEach(crossword => {
          crossword.gridStyle = {
            gridTemplateColumns: `repeat(${crossword.board[0].length}, 1fr)`
          }
          delete crossword.clues
        })

        // add fillers if fewer than 5 recent crosswords
        let fillers = []
        for (let i = 0; i < 5 - crosswords.length; i++) {
          fillers.push('filler' + i)
        }

        // grab a random set of 10 crosswords from the database
        const randomCrosswords = [[], []]
        for (let i = 0; i < 5; i++) {
          let res = await axios(
            `${API_URL}/api/crossword/${getRandomPuzzleId()}`
          )
          let crossword = await res.data
          randomCrosswords[0].push(crossword)
        }
        randomCrosswords[0].forEach(crossword => {
          crossword.gridStyle = {
            gridTemplateColumns: `repeat(${crossword.board[0].length}, 1fr)`
          }
          delete crossword.clues
        })

        for (let i = 0; i < 5; i++) {
          let res = await axios(
            `${API_URL}/api/crossword/${getRandomPuzzleId()}`
          )
          let crossword = await res.data
          randomCrosswords[1].push(crossword)
        }
        randomCrosswords[1].forEach(crossword => {
          crossword.gridStyle = {
            gridTemplateColumns: `repeat(${crossword.board[0].length}, 1fr)`
          }
          delete crossword.clues
        })

        this.setState({ crosswords, randomCrosswords, fillers })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render = () => {
    const { isLoggedIn, user } = this.props
    const { crosswords, randomCrosswords, fillers } = this.state
    return (
      <div id="PuzzleBrowser-Container">
        {isLoggedIn &&
          user && (
            <div className="PuzzleBrowser-Section">
              <div className="PuzzleBrowser-Section-Title">
                Your Unfinished Puzzles
              </div>
              <div className="PuzzleBrowser-Section-Container">
                <div className="PuzzleBrowser-Arrow-Container">
                  <div className="PuzzleBrowser-No-Arrow" />
                </div>
                <div className="PuzzleBrowser-Puzzle-Container">
                  {crosswords.map(crossword => (
                    <Puzzle key={crossword.id} crossword={crossword} />
                  ))}
                  {fillers.map(filler => (
                    <div style={this.fillerStyle} key={filler} />
                  ))}
                </div>
                <div className="PuzzleBrowser-Arrow-Container">
                  <div className="PuzzleBrowser-No-Arrow" />
                </div>
              </div>
            </div>
          )}
        <div className="PuzzleBrowser-Section">
          <div className="PuzzleBrowser-Section-Title">Most Popular</div>
          <div className="PuzzleBrowser-Section-Container">
            <div className="PuzzleBrowser-Arrow-Container">
              <div className="PuzzleBrowser-No-Arrow" />
            </div>
            <div className="PuzzleBrowser-Puzzle-Container">
              {randomCrosswords[0].map(crossword => (
                <Puzzle key={crossword.id} crossword={crossword} />
              ))}
            </div>
            <div className="PuzzleBrowser-Arrow-Container">
              <div className="PuzzleBrowser-Arrow">
                <img src={rightArrowButton} alt="Scroll Right" />
              </div>
            </div>
          </div>
        </div>
        <div className="PuzzleBrowser-Section">
          <div className="PuzzleBrowser-Section-Title">NYTimes Collection</div>
          <div className="PuzzleBrowser-Section-Container">
            <div className="PuzzleBrowser-Arrow-Container">
              <div className="PuzzleBrowser-Arrow">
                <img src={leftArrowButton} alt="Scroll Left" />
              </div>
            </div>
            <div className="PuzzleBrowser-Puzzle-Container">
              {randomCrosswords[1].map(crossword => (
                <Puzzle key={crossword.id} crossword={crossword} />
              ))}
            </div>
            <div className="PuzzleBrowser-Arrow-Container">
              <div className="PuzzleBrowser-Arrow">
                <img src={rightArrowButton} alt="Scroll Right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({ user }) => ({ user, isLoggedIn: !!user._id })

export default connect(mapState)(PuzzleBrowser)

/* PROP TYPES */
PuzzleBrowser.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    googleId: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
