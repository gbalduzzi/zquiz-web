import React, { Component } from 'react';

import config from '../../config.json';

class QuestionTimer extends Component {
    componentWillMount() {
        this.state = {
            timer: 0
        }
    }
    componentDidMount() {
        this.decrementTimer()
    }
    componentWillUnmount() {
        clearInterval(this.realTimer)
    }
    componentWillReceiveProps(nextProps) {
          if (nextProps.question !== this.props.question) {
              this.setState({
                  timer: 0
              })
              this.decrementTimer()
          }
    }
    decrementTimer() {
        var timer = new Date();
        this.realTimer = setInterval(function() {
            var dt = Math.round(((new Date()) - timer) / 1000);
            if (dt >= config.question_time + 1) {
                this.setState({ timer: config.question_time})
                clearInterval(this.realTimer)
                this.props.endCallback()
            } else {
                this.setState({timer : dt})
            }
        }.bind(this) , 1000)
    }
    render() {
        return (
            <div id='timer'>
                <h3>{config.question_time - this.state.timer}s</h3>
            </div>
        )
    }
}

export default QuestionTimer
