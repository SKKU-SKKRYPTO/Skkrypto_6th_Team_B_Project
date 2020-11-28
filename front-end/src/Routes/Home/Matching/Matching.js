import React from 'react';
import "./Matching.css";
import caver from 'caver';
import DEPLOYED_ABI from 'deployedABI.json';
import DEPLOYED_ADDRESS from 'deployedAddress.json';

class Matching extends React.Component{
    constructor() {
        super();
        this.shareContract = DEPLOYED_ABI
			&& DEPLOYED_ADDRESS
			&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS.address)
		this.state = {
            participant: 0,
            msg_sender: caver.klay.accounts.wallet[0].address
        }
    }

    // getParticipant = async () => {
    //     const count = await this.shareContract.methods.getParticipant().call({
    //         from: this.state.msg_sender
    //     });
	// 	this.setState({participant: count})
    // }

    // 현재 로그인된 계정 정보불러오기?
    getWallet = function() {
        if (caver.klay.accounts.wallet.length) {
            return caver.klay.accounts.wallet[0];
        }
    }
    
    createParty = async() => {
        console.log(this.state.msg_sender); // 주소확인용 (test)

        this.shareContract.methods.createParty().send({
            from: this.state.msg_sender,
            gas: '250000',
            value: 0
        })
        .once('transactionHash', (txHash) => {
            console.log(`txHash: ${txHash}`);
        })
        .once('receipt', (receipt) => {
            console.log(`(#${receipt.blockNumber})`, receipt);
            alert("방이 생성되었습니다. 마이페이지에서 확인하세요!");
        })
        .once('errer', (error) => {
            console.log(error.message);
            alert("방을 생성하지 못했습니다.");
        })
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
            .once('transactionHash', (txHash) => {
                console.log(`txHash: ${txHash}`);
            })
            .once('receipt', (receipt) => {
                console.log(`(#${receipt.blockNumber})`, receipt);
                alert("매칭 성공! 마이페이지에서 확인하세요.");
            })
            .once('errer', (error) => {
                console.log(error.message);
            });
        } else {
            alert("매칭 실패! 현재 비어있는 방이 없습니다.");
        }
    }
    
    render(){
        
        return(
            <>
            <div>
                <div className="matching-wrap">
                    <div className="matching-container">
                        <div className="Party-owner">
                            <h2>파티장</h2>
                            <p>- 매월 3700원(Klay 변경?)</p>
                            <p>- 파티원에 비해 월 500원 절감</p>
                            <button className="create-party" onClick={this.createParty}>매칭하기</button>
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