import React from 'react';
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../images/logo.png";


function Navigation() {
    return (
        <div className="nav">
            <div className="logo">
                <img src ={logo} width="300" height="300"/>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/matching" >매칭 서비스</Link></li>
                    <li><Link to="/introduction" >서비스 소개</Link></li>
                    <li><Link to="/mypage" >마이페이지</Link></li>
                </ul>
            </div>
            
        </div>
    );
}

export default Navigation;