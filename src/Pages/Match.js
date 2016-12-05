import React, { Component } from 'react';

import QuestionTimer from '../Components/QuestionTimer.js'
import Api from '../Utils/api.js'

class Match extends Component {
    constructor(props) {
        super(props)

        this.updateQuestion = this.updateQuestion.bind(this)
        this.getNextQuestion = this.getNextQuestion.bind(this)
        this.answerClick = this.answerClick.bind(this)
    }
    componentWillMount() {
        // Inizializzo lo stato
        this.state = {
            question: {
                number : 0,
                question : "",
                answer_one : "",
                answer_two : "",
                answer_three : "",
                answer_four : "",
            },
            score: 0,
            opponent_score : 0,
            selected_answer : 0
        }

        setTimeout(this.getNextQuestion, 2000)

    }
    getNextQuestion() {
        var n = parseInt(this.state.question.number, 10)
        if (n <0 || n > 3) return; // TODO: ?!??!?
        Api.getQuestion(n+1, this.updateQuestion)

    }
    updateQuestion(json) {
        if(json.error === 1) return; //TODO

        this.setState({
            question: {
                number : parseInt(json.question_id, 10),
                question : json.question,
                answer_one : json.answer_one,
                answer_two : json.answer_two,
                answer_three : json.answer_three,
                answer_four : json.answer_four,
            }
        })
    }
    answerClick(event) {
        var n = event.currentTarget.getAttribute('data-id')
        this.state.selected_answer === n ? this.setState({'selected_answer' : 0}) : this.setState({'selected_answer' : n})
    }
    render() {
        return (
            <div className="match">
                {this.state.question.question === "" ?
                    <MatchDetails /> :
                    <div className="question">
                        <QuestionTimer endCallback={this.getNextQuestion} question={this.state.question.number}/>
                        <h1>{this.state.question.question}</h1>
                        <div className={this.state.selected_answer === "1" ? "answer selected" : "answer"} data-id="1" onClick={this.answerClick} id="answer_one">{this.state.question.answer_one}</div>
                        <div className={this.state.selected_answer === "2" ? "answer selected" : "answer"} data-id="2" onClick={this.answerClick} id="answer_two">{this.state.question.answer_two}</div>
                        <div className={this.state.selected_answer === "3" ? "answer selected" : "answer"} data-id="3" onClick={this.answerClick} id="answer_three">{this.state.question.answer_three}</div>
                        <div className={this.state.selected_answer === "4" ? "answer selected" : "answer"} data-id="4" onClick={this.answerClick} id="answer_four" >{this.state.question.answer_four}</div>
                        <div className="button answer" id="answer_button">Rispondi</div>
                    </div>
                }
            </div>
        );
    }
}

class MatchDetails extends Component {
    render() {
        return(
            <div className="content">
                Avversario trovato: <b>{localStorage.opponent}</b>
                <div className="userInfo">
                    <span className="username">{localStorage.opponent}</span>
                    <span className="name">{localStorage.opponentName} {localStorage.opponentSurname}</span>
                    <span className="wins"><b>{localStorage.opponentWins}</b> vittorie</span>
                </div>
            </div>
        )
    }
}


export default Match;
