import React, { Component } from 'react';

import {deleteCookie} from '../Utils/cookie.js'
import Message from '../Utils/message.js'

class Logout extends Component {
    componentWillMount() {
        // Elimino dati utente
        deleteCookie('user_token')
        localStorage.userData = {}
        // Redirect ad homepage
        this.props.router.push('/')
        Message.setFlush(true)
        Message.addMessage('info', 'Logout avvenuto con successo')
    }
    render() {
        return (
            <div className="logout">
                Sei stato sloggato!
            </div>
        );
    }
}

export default Logout;
