import React, { Component } from 'react';

// import Api from '../Utils/api.js'

function loginCallback(json) {
    console.log(json);
}

class Login extends Component {
    render() {
        return (
            <div className="login">
                Login
            </div>
        );
    }
}

export default Login;
