import React from 'react';
import "./Intro.css";

class Intro extends React.Component{
	render() {
		return(
			<div className="intro">
				<div className="wrap">
					<div className="intro-container">
						<div className="box">
							<h3>자동으로 파티장과 파티원을 매칭</h3>
							<p>N - Share는 파티원을 자동매칭해 직접 계정공유 상대를 찾는 수고로움을 줄여줍니다.</p>
						</div>
						<div className="box">
							<h3>안전하고 저렴한 결제, 정산</h3>
							<p>블록체인 기반 스마트 컨트랙트를 통해 결제 시스템을 간단하고 수수료가 적게 만들었습니다.</p>
						</div>
						<div className="box">
							<h3>중도에 중단해도 환불!</h3>
							<p>중도에 계정 공유를 중단하더라도 사용한 기간에 따라 환불을 해줍니다.</p>
						</div>
						<div className="box">
							<h3>투표시스템</h3>
							<p>N - Share는 투표시스템을 통해 부정 사용자를 추방, 불이익을 주는 것이 가능합니다.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Intro;