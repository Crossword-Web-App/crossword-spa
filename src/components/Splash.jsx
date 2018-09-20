import React, { Component } from 'react'
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

    // this.tick = this.tick.bind(this)
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
            <Link to={`/crossword/${1234}`}>
              Start Playing Now
            </Link>
          </div>
          OR
          <div className="Splash-Google">
            <a href={`${API_URL}/auth/google`}>
              <img src={googleIcon} alt="Google" />
            </a>
            <div className="Splash-Button-Minitext">
              to save game progress and track your stats
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Splash)
