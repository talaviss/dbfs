import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/TabContent';
import TabContent from './components/TabContent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />  */}
          <TabContent />
        
        </header>
      </div>
    );
  }
}

export default App;
