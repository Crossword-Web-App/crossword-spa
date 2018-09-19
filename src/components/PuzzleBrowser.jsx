import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Puzzle from './PuzzleBrowser/Puzzle'
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
      fillers: []
    }
  }

  async componentDidMount() {
    const { user } = this.props
    try {
      if (user._id) {
        let res = await axios(`${API_URL}/api/users/${user._id}/all_crosswords`)
        let crosswords = await res.data
        let fillers = []
        for (let i = 0; i < 5 - crosswords.length; i++) fillers.push(0)
        this.setState({ crosswords, fillers })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render = () => {
    const { isLoggedIn, user } = this.props
    const { crosswords, fillers } = this.state
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
                  {crosswords.map(crossword => <Puzzle id={crossword.id} />)}
                  {fillers.map(() => <div style={this.fillerStyle} />)}
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
              <Puzzle />
              <Puzzle />
              <Puzzle />
              <Puzzle />
              <Puzzle />
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
              <Puzzle />
              <Puzzle />
              <Puzzle />
              <Puzzle />
              <Puzzle />
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
