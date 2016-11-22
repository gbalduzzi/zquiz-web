import React, { Component } from 'react';
import {Header} from '../Components/Header.js';

class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <Header pathname={this.props.location.pathname} />
            Homepage
      </div>
    );
  }
}
export default Home;
