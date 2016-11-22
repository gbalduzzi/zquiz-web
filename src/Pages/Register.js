import React, { Component } from 'react';
import {Header} from '../Components/Header.js';

class Register extends Component {
  render() {
    return (
      <div className="register">
        <Header pathname={this.props.location.pathname} />
        Register
      </div>
    );
  }
}

export default Register;
