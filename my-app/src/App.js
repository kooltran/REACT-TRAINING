import React, { Component } from 'react';
import CardList from './component/CardList';
// import { Root } from './component/Root';
import { Home } from './component/Home'
import { User } from './component/User'
import {Router, Route} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* <CardList /> */}
        <Router>
          <Route path={"user"} component={User}/>
          <Route path={"home"} component={Home}/>
        </Router>
      </div>
    );
  }
}

export default App;
