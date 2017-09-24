import React, { Component } from 'react';
import CardList from './component/CardList';
import RouterDemo from './component/RouterDemo';
import Calculator from './component/LiftingStateUp'
import FormDemo from './component/FormDemo';
import {Router, Route} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <CardList /> */}
        {/* <RouterDemo /> */}
        {/* <Calculator /> */}
        <FormDemo />
      </div>
    );
  }
}

export default App;
