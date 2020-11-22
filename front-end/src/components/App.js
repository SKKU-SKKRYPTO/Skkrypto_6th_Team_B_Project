import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import matching from "../routes/matching";
import introduction from "../routes/introduction";
import mypage from "../routes/mypage";
import Navigation from "./Navigation";
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
          <Route path="/matching" exact={true} component={matching} />
          <Route path="/introduction" exact={true} component={introduction} />
          <Route path="/mypage" exact={true} component={mypage} />
        </HashRouter>
      </Container>
    );
  }
}

export default App;