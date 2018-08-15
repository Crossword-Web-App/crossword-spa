import React, { Component } from 'react'
import './css/Timer.css'


class Timer extends Component {
    constructor(props) {
      super(props)

      this.state = {
        timer: null,
        counter: 0
      };

      this.tick = this.tick.bind(this)
    }

    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
      }
    componentWillUnmount() {
        this.clearInterval(this.state.timer);
      }
    tick() {
        this.setState({
          counter: this.state.counter + 1
        });
      }
    
    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        if (hours) return hours + ':' + minutes + ':' + seconds
        else if (minutes) return minutes + ':' + seconds
        else return seconds
    }

    render() {
        return (
      <div className='Timer'>{this.secondsToTime(this.state.counter)}</div>
        )
    }

}

export default Timer