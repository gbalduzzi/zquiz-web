import React, { Component } from 'react';
import { Link } from 'react-router';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

class Login extends Component {
    constructor(props) {
        super(props)
        this.loginCallback = this.loginCallback.bind(this)
    }
    loginCallback(json) {
        if (json.error === 0) {
            Message.addMessage('success','Login eseguito con successo')
            setTimeout(this.props.router.push('/user'), 1000)
        } else {
            localStorage.removeItem('username');
            Message.addMessage('error','I dati inseriti non sono validi')
        }
    }
    render() {
        return (
            <div className="login">
                <div className="content">
                    <span className="redirect-link">
                        <Link to={'/register'}>Non hai un account?</Link>
                        </span>
                    Effettua il <b>login</b> con le tue credenziali per iniziare a giocare
                </div>
                <LoginForm loginCallback={this.loginCallback}/>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this)
    }
    submitForm(e) {
        e.preventDefault()
        Message.setFlush(true);
        const user = document.getElementById('username').value
        const psw = document.getElementById('password').value
        if (user === "" || psw === "") {
            Message.addMessage('error','Non tutti i campi sono stati compilati')
        } else {
            localStorage.username = user;
            Api.authenticate({
                username: user,
                password: psw
            }, this.props.loginCallback)
        }
    }
    render() {
        return (
            <form id="login-form" className="auth-form" onSubmit={this.submitForm}>
                <input type="text" name="username" id="username" className="text-input input" placeholder="Username"  tabIndex="1"/>
                <input type="password" name="password" id="password" className="text-input input" placeholder="Password" tabIndex="2"/>
                <input type="submit" value="Login" className="submit-button input" tabIndex="3"/>
            </form>
        )
    }
}

export default Login;
