import React, { Component } from 'react';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

function loginCallback(json) {
    console.log(json);
}

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="content">
                    Effettua il <b>login</b> con le tue credenziali per iniziare a giocare
                </div>
                <LoginForm />
            </div>
        );
    }
}

class LoginForm extends Component {
    validateForm(e) {
        e.preventDefault()
        const user = document.getElementById('username').value
        const psw = document.getElementById('password').value
        if (user === "" || psw === "") Message.addMessage('error','Non tutti i campi sono stati compilati')
    }
    render() {
        return (
            <form id="login-form" className="auth-form" onSubmit={this.validateForm}>
                <input type="text" name="username" id="username" className="text-input input" placeholder="Username" />
                <input type="password" name="password" id="password" className="text-input input" placeholder="Password"/>
                <input type="submit" value="Login" className="submit-button input" />
            </form>
        )
    }
}

export default Login;
