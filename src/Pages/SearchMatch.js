import React, { Component } from 'react';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

class SearchMatch extends Component {
    constructor(props) {
        super(props)

        this.requestMatch = this.requestMatch.bind(this)
        this.beginMatch = this.beginMatch.bind(this)
    }
    requestMatch() {
        Api.searchMatch(this.beginMatch)
    }
    beginMatch(json) {
        if (json.error !== 0) {
            clearInterval(this.searchTimer)
            this.props.router.push('/user')
            Message.addMessage('error','Si è verificato un errore. Preghiamo di riprovare')
            return;
        }

        if(json.match_id) { //Partita trovata
            clearInterval(this.searchTimer)
            localStorage.match_id = json.match_id
            localStorage.opponent = json.opponent
            this.props.router.push('/match')
        }
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
