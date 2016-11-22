import React, { Component } from 'react';
import {Header} from '../Components/Header.js';

import Api from '../Utils/api.js'

function loginCallback(json) {
    console.log(json);
}

class Login extends Component {
    constructor(props) {
        super(props)
        Api.register({ username: "gio", password : "test"}, loginCallback)
    }
    render() {
        return (
            <div className="login">
                <Header pathname={this.props.location.pathname} />
                Login
            </div>
        );
    }
}

export default Login;
