import React, { Component } from 'react'
import './css/Square.css'

class Square extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Square">
        [{this.props.row}, {this.props.square}]
      </div>
    )
  }
}
export default Square
