import React, { Component } from 'react';

import { Link } from 'react-router';

class EndMatch extends Component {
    componentWillMount() {
        if (parseInt(localStorage.score,10) > parseInt(localStorage.opponentScore,10)) {
            localStorage.wins = parseInt(localStorage.wins,10) +1
        }
    }
    render() {
        return (
            <div className="endmatch content">
            {parseInt(localStorage.score,10) > parseInt(localStorage.opponentScore,10) ?
                <WinPage /> :
                <LostPage />
            }
            <Link to={`/user`} className="profilelink">Torna al tuo profilo</Link>
            </div>
        );
    }
}

class WinPage extends Component {
    render() {
        return (
            <div className="winpage">
                <h2><b>Complimenti, hai vinto!</b></h2>
                <span><b>{ localStorage.score}</b> : {localStorage.opponentScore}</span>
            </div>
        )
    }
}

class LostPage extends Component {
    render() {
        return (
            <div className="lostpage content">
                <h2 className="lostscore">Hai Perso :(</h2>
                <span>{ localStorage.score} : <span className="lostscore">{localStorage.opponentScore}</span></span>
            </div>
        )
    }
}

export default EndMatch;
