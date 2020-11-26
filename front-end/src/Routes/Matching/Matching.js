import React from 'react';
import "./Matching.css";
import Navigation from "../../Components/Navigation";

class Matching extends React.Component{
    render(){
        return(
            <div>
                <div className="nav">
                    <Navigation />
                </div>
                <div className="matching-wrap">
                    <div className="matching-container">
                        <div className="Party-owner">
                            <h2>파티장</h2>
                            <p>- 매월 3700원(Klay 변경?)</p>
                            <p>- 파티원에 비해 월 500원 절감</p>
                            <button className="create-party">매칭하기</button>
                        </div>
                        <div className="Party-member">
                            <h2>파티원</h2>
                            <p>- 매월 4200원</p>
                            <p>- 계정가입 필요없이 영상 서비스 이용</p>
                            <button className="create-party">매칭하기</button>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}


export default Matching;