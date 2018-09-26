import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Puzzle from './PuzzleBrowser/Puzzle'
import PuzzlesSection from './PuzzleBrowser/PuzzlesSection'
import './css/PuzzleBrowser.css'

const API_URL = process.env.API_URL || 'http://localhost:8080'

const PUZZLES_PER_PAGE = 5
const PUZZLE_COUNT = 43
const BREAK_POINT = 16

class PuzzleBrowser extends Component {
  constructor() {
    super()

    this.state = {
      userCrosswords: [],
      randomCrosswords: [[], []]
    }
  }

  async componentDidMount() {
    const { user } = this.props
    // get the user's recent incomplete crosswords
    try {
      let userCrosswords = []
      if (user._id) {
        let res = await axios(`${API_URL}/api/users/${user._id}/all_crosswords`)
        const crosswordData = await res.data

        crosswordData.forEach(dataItem => {
          const crossword = dataItem.crossword.board
          const spentTime = dataItem.spentTime
          const id = dataItem.crossword.id
          const gridStyle = {
            gridTemplateColumns: `repeat(${crossword.length}, 1fr)`
          }
          userCrosswords.push({ id, crossword, spentTime, gridStyle })
        })
      }

      // grab a random set of crosswords from the database
      const randomCrosswords = [[], []]
      let res = await axios(`${API_URL}/api/crossword/?count=${PUZZLE_COUNT}`)
      let randomCrosswordData = await res.data


      randomCrosswordData.forEach((dataItem, idx) => {
        const crossword = dataItem.board
        const id = dataItem.id
        const gridStyle = {
          gridTemplateColumns: `repeat(${crossword.length}, 1fr)`
        }

        idx <= BREAK_POINT
          ? randomCrosswords[0].push({ id, crossword, gridStyle })
          : randomCrosswords[1].push({ id, crossword, gridStyle })
      })

      this.setState({ userCrosswords, randomCrosswords })
    } catch (err) {
      console.error(err)
    }
  }

  render = () => {
    const { isLoggedIn } = this.props
    const { userCrosswords, randomCrosswords } = this.state
    return (
      <div id="PuzzleBrowser-Container">
        {isLoggedIn && (
            <PuzzlesSection
              title="Your Unfinished Puzzles"
              crosswords={userCrosswords}
            />
          )}
        <PuzzlesSection title="Most Popular" crosswords={randomCrosswords[0]} />
        <PuzzlesSection
          title="Based on Your Taste"
          crosswords={randomCrosswords[1]}
        />
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
