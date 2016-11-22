import React, { Component } from 'react';
import Header from './Components/Header.js';

// Layout common to all pages

class App extends Component {
  render() {
    return (
      <div className="App page-wrapper">
        <Header pathname={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}
export default App;
