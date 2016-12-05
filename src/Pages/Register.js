import React, { Component } from 'react';
import { Link } from 'react-router';

import Api from '../Utils/api.js'
import Message from '../Utils/message.js'

class Register extends Component {
    constructor(props) {
        super(props)
        this.registerCallback = this.registerCallback.bind(this)
    }
    registerCallback(json) {
        if (json.error === 0) {
            Message.addMessage('success','La registrazione ha avuto successo!')
            setTimeout(this.props.router.push('/user'), 1000)
        } else {
            localStorage.removeItem('username');
            Message.addMessage('error','I dati inseriti non sono validi')
        }
    }
    render() {
        return (
            <div className="register">
                <div className="content">
                    <span className="redirect-link">
                        <Link to={'/login'}>Hai già un account?</Link>
                    </span>
                    <b>Registra</b> un nuovo account e sfida subito gli avversari!
                </div>
                <RegisterForm registerCallback={this.registerCallback} />
            </div>
        );
    }
}

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this)
    }
    submitForm(e) {
        e.preventDefault()
        Message.setFlush(true);
        const user = document.getElementById('username').value;
        const psw = document.getElementById('password').value;
        const confirmPsw = document.getElementById('password-confirm').value;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        if (user === "" || psw === "" || confirmPsw === "")
            Message.addMessage('error','Non tutti i campi necessari sono stati compilati')
        else if (psw.length < 4)
            Message.addMessage('error','La password inserita non è abbastanza lunga')
        else if (psw !== confirmPsw)
            Message.addMessage('error','Le password inserite non coincidono')
        else {
            localStorage.username = user;
            Api.register({
                username: user,
                password: psw,
                name: name,
                surname: surname
            }, this.props.registerCallback)
        }
    }
    render() {
        return (
            <form id="register-form" className="auth-form" onSubmit={this.submitForm}>
                <input type="text" name="username" id="username" className="text-input input" placeholder="Username" tabIndex="1"/>
                <input type="password" name="password" id="password" className="text-input input" placeholder="Password" tabIndex="2"/>
                <input type="password" name="password-confirm" id="password-confirm" className="text-input input" placeholder="Conferma Password" tabIndex="3"/>
                <input type="text" name="name" id="name" className="text-input input" placeholder="Nome" tabIndex="4"/>
                <input type="text" name="surname" id="surname" className="text-input input" placeholder="Cognome" tabIndex="5" />
                <input type="submit" value="Registrati" className="submit-button input button" tabIndex="6"/>
            </form>
        )
    }
}

export default Register;
