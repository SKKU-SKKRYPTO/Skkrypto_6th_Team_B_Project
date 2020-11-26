import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Matching from "Routes/Matching/Matching";
import Intro from "Routes/Intro/Intro";
import Mypage from "Routes/Mypage/Mypage";
import Main from "Routes/Main/Main"
import './App.css';



class App extends Component {
  render() {
    return (
      <div className = "container">
        <HashRouter>
          <Route path="/" exact={true} component={Main} />
          <Route path="/Matching" exact={true} component={Matching} />
          <Route path="/Intro" exact={true} component={Intro} />
          <Route path="/Mypage" exact={true} component={Mypage} />
        </HashRouter>
      </div>
    );
  }
}

export default App;