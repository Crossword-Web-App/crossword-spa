import React, { Component } from 'react'
import './css/Square.css'

class Square extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Square">
        [{this.props.square > 0 ? this.props.square : ""}]
      </div>
    )
  }
}
export default Square