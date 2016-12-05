import React, { Component } from 'react';

import config from '../../config.json';

class QuestionTimer extends Component {
    componentWillMount() {
        this.state = {
            timer: config.question_time
        }
    }
    componentDidMount() {
        this.decrementTimer()
    }
    componentWillReceiveProps(nextProps) {
          if (nextProps.question !== this.props.question) {
              this.setState({
                  timer: config.question_time
              })
          }
          this.decrementTimer()
    }
    decrementTimer() {
        var decrementTimer = setInterval(function() {
            if (this.state.timer <= 0) {
                clearInterval(decrementTimer)
                this.props.endCallback()
            } else {
                this.setState({timer : this.state.timer-1})
            }
        }.bind(this) , 1000)
    }
    render() {
        return (
            <div id='timer'>
                <h3>{this.state.timer}s</h3>
            </div>
        )
    }
}

export default QuestionTimer
