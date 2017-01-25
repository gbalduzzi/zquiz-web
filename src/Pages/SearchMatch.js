import React, { Component } from 'react';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

class SearchMatch extends Component {
    constructor(props) {
        super(props)
        this.requestMatch = this.requestMatch.bind(this)
        this.checkMatch = this.checkMatch.bind(this)
        this.setOpponentDetails = this.setOpponentDetails.bind(this)
    }
    requestMatch() {
        Api.searchMatch(this.checkMatch)
    }
    checkMatch(json) {
        if (json.error !== undefined && json.error > 0) {
            clearInterval(this.searchTimer)
            this.props.router.push('/user')
            Message.addMessage('error','Si è verificato un errore. Preghiamo di riprovare')
            return;
        }

        if(json.match_id) { //Partita trovata
            clearInterval(this.searchTimer)
            localStorage.match_id = json.match_id
            localStorage.opponent = json.opponent

            Api.getUser(json.opponent, this.setOpponentDetails)
        }
    }
    setOpponentDetails(json) {
        if (json.error === undefined) {
            localStorage.opponentName = json.name
            localStorage.opponentSurname = json.surname
            localStorage.opponentWins = json.wins
        }

        this.props.router.push('/match/'+localStorage.match_id)

    }
    componentDidMount() {
        this.searchTimer = setInterval(
            this.requestMatch,
            1500
        )
    }
    componentWillUnmount() {
        clearInterval(this.searchTimer)
    }
    render() {
        return (
            <div className="searchMatch">
                <div className="loaderWrapper">
                    <div className="loader"></div>
                </div>
                <div className="content">
                    Alla ricerca di un avversario..
                </div>
            </div>
        );
    }
}


export default SearchMatch;
