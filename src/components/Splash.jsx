import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getRandomPuzzleId from '../utilities/getRandomPuzzleId'
import './css/Splash.css'
import googleIcon from './icons/google.png'

const API_URL = process.env.API_URL || 'http://localhost:8080'

const getRandomBoardSquares = () => {
  const boardSquares = []
  for (let i = 0; i < 225; i++) {
    boardSquares.push(
      <div
        className="Splash-Square"
        style={{ backgroundColor: Math.random() < 0.25 ? 'black' : 'white' }}
        key={i}
      />
    )
  }
  return boardSquares
}

class Splash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: null,
      boardSquares: getRandomBoardSquares()
    }
  }

  componentDidMount = () => {
    const timer = setInterval(this.getRandomBoardSquares, 800)
    this.setState({ timer })
  }

  componentWillUnmount() {
    const { timer } = this.state
    clearInterval(timer)
  }

  getRandomBoardSquares = () => {
    const boardSquares = []
    for (let i = 0; i < 225; i++) {
      boardSquares.push(
        <div
          className="Splash-Square"
          style={{ backgroundColor: Math.random() < 0.15 ? 'black' : 'white' }}
          key={i}
        />
      )
    }
    this.setState({ boardSquares })
  }

  render = () => {
    const { isLoggedIn } = this.props
    const { boardSquares } = this.state
    return (
      <div className="Splash">
        <div className="Splash-Puzzle">
          <div className="Splash-Board">
            <div className="Splash-Board-Squares">
              {boardSquares.map(square => square)}
            </div>
          </div>
        </div>
        <div className="Splash-Actions">
          <div className="Splash-Button">
            <Link to={`/crossword/${getRandomPuzzleId()}`}>
              Start Playing Now
            </Link>
          </div>
          {!isLoggedIn ? (
            <a href={`${API_URL}/auth/google`}>
              <div className="Splash-Button-Minitext">OR</div>
              {/* <img src={googleIcon} alt="Google" /> */}
              <div className="Splash-Button" id="Splash-Button-Google" />
              <div className="Splash-Button-Minitext">
                to save game progress and track your stats
              </div>
            </a>
          ) : (
            <div className="Splash-Button">
            <Link to={`/browse`}>
              Browse Puzzles
            </Link>
          </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = ({ user }) => ({ isLoggedIn: !!user._id })

export default connect(mapState)(Splash)

/* PROP TYPES */
Splash.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
