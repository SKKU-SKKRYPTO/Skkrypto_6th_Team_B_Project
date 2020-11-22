import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Matching from "Routes/Matching";
import Intro from "Routes/Intro";
import Mypage from "Routes/Mypage";
import styled from "styled-components";

const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    /* width: 100vw;
    height: 100vh; */
    width: 100%;
    height: 100%;
  }
`;

class App extends Component {
  render() {
    return (
      <Container>
        <HashRouter>
          <Navigation />
          <Route path="/matching" exact={true} component={Matching} />
          <Route path="/introduction" exact={true} component={Intro} />
          <Route path="/mypage" exact={true} component={Mypage} />
        </HashRouter>
      </Container>
    );
  }
}

export default App;