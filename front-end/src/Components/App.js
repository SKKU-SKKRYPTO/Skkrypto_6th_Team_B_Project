import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import caver from "caver";
import Cover from "Routes/Cover";
import Home from "Routes/Home";
import './App.css';

class App extends Component {
  componentWillMount() {
    /**
     * sessionStorage는 브라우져에 데이터를 저장하는 기능
     * 단, 브라우져 탭이 닫히면 사라짐
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')

    // walletInstance가 있으면 caver 지갑에 추가함
    if (walletFromSession) {
      try {
        caver.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // walletInstance가 유효하지 않으면 삭제함
        sessionStorage.removeItem('walletInstance');
      }
    }
  }

  render() {
    return (
      <div className="Container">
        <HashRouter>
          <PublicRoute path="/" exact={true} component={Cover} />
          <PrivateRoute path="/home" exact={false} component={Home} />
        </HashRouter>
      </div>
    );
  }
}

export default App;