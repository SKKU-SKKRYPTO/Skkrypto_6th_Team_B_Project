import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import matching from "../routes/matching";
import introduction from "../routes/introduction";
import mypage from "../routes/mypage";
import Navigation from "./Navigation";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className = "container">
      <HashRouter>
        <Navigation />
        <Route path="/matching" exact={true} component={matching} />
        <Route path="/introduction" exact={true} component={introduction} />
        <Route path="/mypage" exact={true} component={mypage} />
      </HashRouter>
    </div>
    );
  }
}

export default App;
