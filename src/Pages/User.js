import React, { Component } from 'react';
import {Header} from '../Components/Header.js';

class User extends Component {
  render() {
    return (
      <div className="user">
        <Header pathname={this.props.location.pathname} />
        Userpage
      </div>
    );
  }
}

export default User;
