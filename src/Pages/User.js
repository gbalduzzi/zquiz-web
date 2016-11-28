import React, { Component } from 'react';
import { Link } from 'react-router';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

function initLocalStorage() {
    if (!localStorage.name) localStorage.name = "";
    if (!localStorage.surname) localStorage.surname = "";
    if (!localStorage.wins) localStorage.wins = 0;
}

class User extends Component {
    constructor(props) {
        super(props)
        this.setUserData = this.setUserData.bind(this);
        initLocalStorage();
    }
    setUserData(json) {
        if (json.error === 0) {
            this.setState({
                username : json.username,
                name :     json.name,
                surname :  json.surname,
                wins :     json.wins,
            })

            localStorage.username = json.username
            localStorage.name = json.name
            localStorage.surname = json.surname
            localStorage.wins = json.wins
        } else {
            Message.addMessage('error','Si è presentato un errore, non è possibile caricare i dati dell\'utente')
        }
    }
    componentWillMount() {
        //Imposto lo state del localStorage
        this.state =  {
            username : localStorage.username,
            name :     localStorage.name,
            surname :  localStorage.surname,
            wins :     localStorage.wins,
        }
        //Ottengo i dati dell'utente
        Api.getUser(localStorage.username,this.setUserData);
    }
    render() {
        return (
            <div className="user">
                <div className="content">
                    <div className="userInfo">
                        <span className="username">{this.state.username}</span>
                        <span className="name">{this.state.name} {this.state.surname}</span>
                        <span className="wins"><b>{this.state.wins}</b> vittorie</span>
                    </div>
                </div>
                <div className="searchMatchWrapper">
                    <Link to={'/searchMatch'} id="searchMatch">Gioca</Link>
                </div>
            </div>
        );
    }
}

export default User;
