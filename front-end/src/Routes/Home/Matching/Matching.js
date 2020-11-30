import React from 'react';
import "./Matching.css";
import caver from 'caver';
import DEPLOYED_ABI from 'deployedABI.json';
import DEPLOYED_ADDRESS from 'deployedAddress.json';
import Modal from 'react-awesome-modal';
import logo from "../../../Images/logo.png";
import closeButton from "../../../Images/closeButton.png";

class Matching extends React.Component{
    constructor(props) {
        super(props);
        this.shareContract = DEPLOYED_ABI
			&& DEPLOYED_ADDRESS
			&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS.address)
		this.state = {
            participant: 0,
            idx: 0,
            msg_sender: caver.klay.accounts.wallet[0].address,
            visible: false,
            account_id: "",
            account_pw: ""
        }
    }

    getParticipant = async() => {
        const count = await this.shareContract.methods.getParticipant().call({
            from: this.state.msg_sender
        });
		this.setState({participant: count})
    }

    getIdx = async() => {
        const partyIdx = await this.shareContract.methods.getIdx().call({
            from: this.state.msg_sender
        });
		this.setState({idx: partyIdx})
    }

    // 현재 로그인된 계정 정보불러오기?
    getWallet = function() {
        if (caver.klay.accounts.wallet.length) {
            return caver.klay.accounts.wallet[0];
        }
    }
    
    createParty = async() => {
        console.log(this.state.msg_sender); // 주소확인용 (test)

        this.shareContract.methods.createParty(this.state.account_id, this.state.account_pw).send({
            from: this.state.msg_sender,
            gas: '250000',
            value: 0
        })
        .once('receipt', (receipt)=> {
            console.log(`(#${receipt.blockNumber})`, receipt);
            alert("방이 생성되었습니다. 마이페이지에서 확인하세요!");
        })
        .then('receipt', (receipt) => {
            console.log("test");
            if(receipt.status) {
                alert("방이 생성되었습니다. 마이페이지에서 확인하세요!");
            } else {
                alert("방을 생성하지 못했습니다.");
            }
        })
        this._closeModal();
    }

    joinParty = async() => {
        console.log(this.state.msg_sender); // 주소확인용 (test)

        const isEmpty = await this.shareContract.methods.isEmptyPartyCheck().call();

        if(isEmpty){
            this.shareContract.methods.joinParty().send({
                from: this.state.msg_sender,
                gas: '250000',
                value: caver.utils.toPeb(1, "KLAY")
            })
            .once('receipt', (receipt) => {
                console.log(`(#${receipt.blockNumber})`, receipt);
                alert("매칭 성공! 마이페이지에서 확인하세요.");
            })
            .then('receipt', (receipt) => {
                console.log("test");
                if(receipt.status) {
                    alert("매칭 성공! 마이페이지에서 확인하세요.");
                } else {
                    alert("매칭실패! 현재 매칭 정보를 확인하세요.");
                }
            }) 
        } else {
            alert("매칭 실패! 현재 비어있는 방이 없습니다.");
        }
    }

    _openModal = function() {
		this.setState({
			visible : true
		});
	}

	_closeModal = function() {
		this.setState({
			visible : false
		});
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    // testaccount = function() {
    //     console.log(`ID: ${this.state.account_id}`);
    //     console.log(`PW: ${this.state.account_pw}`);
    //     this._closeModal();
    // }
    
    render(){
        
        return(
            <>
            <div>
                {/* <div>
					<button onClick={this.getParticipant}>방 확인</button>
					{this.state.participant}
				</div>
                <div>
					<button onClick={this.getIdx}>인덱스 확인</button>
					{this.state.idx}
				</div> */}
                <div className="matching-wrap">
                    <div className="matching-container">
                        <div className="Party-owner">
                            <h2>파티장</h2>
                            <p>- 매월 3700원(Klay 변경?)</p>
                            <p>- 파티원에 비해 월 500원 절감</p>
                            <button className="create-party" onClick={() => this._openModal()}>매칭하기</button>
                            <Modal className="account-modal"
                                   visible={this.state.visible}
                                   width="1000" height="500"
                                   effect="fadeInUp"
                                   onClickAway = {() => this._closeModal()}>
                                <div className="account-modal-container">
                                    <div className="account-modalHeader">
									    <img className="account-Logo" src={logo} alt="로그인 폼의 로고 이미지"/>
									    <h2>넷플릭스 계정정보 입력</h2>
									    <img className="account-closeButton" src={closeButton} onClick={()=>this._closeModal()} alt="닫기 버튼"/>
								    </div>
                                    <div className="account-input">
                                        <div className="account-email">
                                            <label  className="account-input-label">넷플릭스 이메일: </label>
                                            <input className="account-input-email" name="account_id" onChange={this.handleChange} />
                                        </div>
                                        <div className="account-password">
                                            <label className="account-input-label">넷플릭스 비밀번호: </label>
                                            <input className="account-input-password" type="password" name="account_pw" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="create-party-add-account">
                                        <button className="create-party-button" onClick={this.createParty}>계정 입력</button>
                                    </div>
                                </div>

                            </Modal>
                        </div>
                        <div className="Party-member">
                            <h2>파티원</h2>
                            <p>- 매월 4200원</p>
                            <p>- 계정가입 필요없이 영상 서비스 이용</p>
                            <button className="create-party" onClick={this.joinParty}>매칭하기</button>
                        </div>
                    </div>
                </div>
                
            </div>
            </>
        );
    }
}


export default Matching;