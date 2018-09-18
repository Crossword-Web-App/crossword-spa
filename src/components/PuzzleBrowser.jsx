import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Puzzle from './PuzzleBrowser/Puzzle'
import './css/PuzzleBrowser.css'
import leftArrowButton from './icons/arrow-left.svg'
import rightArrowButton from './icons/arrow-right.svg'

const PuzzleBrowser = ({ isLoggedIn, user }) => (
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
              <Puzzle />
              <Puzzle />
              <Puzzle />
              <div style={{ flexBasis: '18em', flexGrow: 1, flexShrink: 1 }} />
              <div style={{ flexBasis: '18em', flexGrow: 1, flexShrink: 1 }} />
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
