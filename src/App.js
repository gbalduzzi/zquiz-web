import React, { Component } from 'react';


// Layout common to all pages

class App extends Component {
  render() {
    return (
      <div className="App page-wrapper">
        {this.props.children}
      </div>
    );
  }
}
export default App;
