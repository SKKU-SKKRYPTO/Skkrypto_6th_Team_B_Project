import React from 'react';
import "./Main.css";
import logo from "../../Images/logo.png";
import closeButton from "../../Images/closeButton.png";
import Modal from 'react-awesome-modal';
import { Link } from "react-router-dom";

class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            visible1 : false,
            visible2 : false,
            email: "",
            password: "",
            text:"계정공유를 안전하고 편리하게"
        }
    }
    
    
    _openModal1 = function() {
        this.setState({
            visible1 : true
        });
    }

    _closeModal1 = function() {
        this.setState({
            visible1 : false
        });
    }

    _openModal2 = function() {
        this.setState({
            visible2 : true
        });
    }

    _closeModal2 = function() {
        this.setState({
            visible2 : false
        });
    }

    _closeModalAndAlert = function() {
        this.setState({
            visible2 : false
        });
        alert('회원가입 완료! 로그인해주세요!');
    }

    // useInterval(){
    //     setInterval(() => {
    //         var i = 0;
    //         var textList = [
    //             "계정공유를 안전하고 편리하게",
    //             "자동 매칭 시스템으로 계정 공유 상대를 찾는 수고로움을 덜어줍니다.",
    //             "블록체인을 활용한 스마트 컨트랙트로 안전하고 수수료가 적은 결제시스템을 제공합니다."
    //         ]
    //         if(i === 0)
    //         {
    //             this.setState({
    //                 text: textList[1]
    //             })
    //             i++;
    //         }
    //         else if(i === 1)
    //         {
    //             this.setState({
    //                 text: textList[2]
    //             })
    //             i++;
    //         }
    //         else if(i === 2)
    //         {
    //             this.setState({
    //                 text: textList[0]
    //             })
    //             i = 0;
    //         }
            
            
    //     }, 5000);
    // } 

    componentDidMount(){
        var i = 0;
        var textList = [
            "계정공유를 안전하고 편리하게",
            "자동 매칭 시스템으로 계정 공유 상대를 찾는 수고로움을 덜어줍니다.",
            "블록체인을 활용한 스마트 컨트랙트로 안전하고 수수료가 적은 결제시스템을 제공합니다."
        ]
        setInterval(() => {
            if(i === 0)
            {
                this.setState({
                    text: textList[1]
                })
                i++;
            }
            else if(i === 1)
            {
                this.setState({
                    text: textList[2]
                })
                i++;
            }
            else if(i === 2)
            {
                this.setState({
                    text: textList[0]
                })
                i = 0;
            }
            
        }, 5000);
    }

    


    render(){
        return(
            <div className="Main-container">
                <div className="logo">
                    <img src ={logo} width="300" height="300"/>
                </div>
                <div className="center-box">
                    <div className="text">
                        <p >{this.state.text}</p>
                    </div>
                    <div className="button">
                        <button className="join" onClick={() => this._openModal1()}>이용하러 가기</button>
                        <Modal className="login-modal"
                               visible={this.state.visible1} 
                               width="1000" height="700"
                               effect="fadeInUp"
                               onClickAway = {() => this._closeModal1()}>
                            <div className="login-modal-cotainer">
                                <div className="login-modalHeader">
                                    <img className="loginLogo" src={logo}/>
                                    <h2>로그인</h2>
                                    <img className="login-closeButton" src={closeButton} onClick={()=>this._closeModal1()}/>
                                </div>
                                    <form>
                                        <div className="login-input-email">
                                            <p>이메일</p>
                                            <input type="text" placeholder="이메일 입력..."></input>
                                        </div>

                                        <div className="login-input-password">
                                            <p>비밀번호</p>
                                            <input type="text" placeholder="비밀번호 입력..."></input>
                                        </div>

                                        <div className="submit-login">
                                            {/* <input type="button" value="로그인"></input> */}
                                            {/* 여기 타입도 submit으로? */}
                                            <Link to="/matching" className="input" onClick={()=>this._closeModal1()}>로그인</Link>
                                        </div>
                                    </form>
                                        <div className="signin">
                                            <p>아이디가 없으시다면?</p>
                                            <button className="signin-button" onClick={() => this._openModal2()}>회원가입</button>
                                            <Modal className="sigin-modal"
                                                   visible={this.state.visible2} 
                                                   width="500" height="800"
                                                   effect="fadeInUp"
                                                   onClickAway = {() => this._closeModal2()}>
                                                <div className="signin-modal-container">
                                                    <div className="signin-modalHeader">
                                                        <img className="signinLogo" src={logo}/>
                                                        <img className="signin-closeButton" src={closeButton} onClick={()=>this._closeModal2()}/>
                                                    </div>
                                                    <form>
                                                        <div className="signin-input-email">
                                                            <p>이메일</p>
                                                            <input type="text" placeholder="이메일 입력..."></input>
                                                        </div>
                                                        <div className="signin-input-password">
                                                            <p>비밀번호</p>
                                                            <input type="text" placeholder="비밀번호 입력..."></input>
                                                        </div>
                                                        <div className="submit-signin">
                                                            <input type="submit" value="가입" onClick={() => this._closeModalAndAlert()}></input>
                                                        </div>
                                                    </form>
                                                </div>

                                            </Modal>
                                        </div>
                            </div> 
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}


export default Main;