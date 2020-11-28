import React from 'react';
import PartyPresenter from './PartyPresenter';
import cx from 'classnames';
import caver from 'caver';
import DEPLOYED_ABI from 'deployedABI.json';
import DEPLOYED_ADDRESS from 'deployedAddress.json';
//import styled from "styled-components";
//import Wrapper from "Components/Wrapper"

// TODO: Klaytn 노드에게 내 지갑 주소

class ShareContract extends React.Component {
	constructor() {
		super();
		// 1. 컨트랙트 인스턴스 생성
		// ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
		// 컨트랙트 메서드를 이 인스턴스로 호출할 수 있음
		// this.countContract 변수로 인스턴스에 접근 가능
		this.shareContract = DEPLOYED_ABI
			&& DEPLOYED_ADDRESS
			&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS.address)
		this.state = {participant: 0}
	}

	isEmptyPartyCheck = async () => {
		const isEmpty = await this.shareContract.methods.isEmptyPartyCheck().call();
		console.log(isEmpty);
	}

	getParticipant = async () => {
		// 2. 컨트랙트 메서드 호출 (CALL)
		// ex:) this.countContract.methods.methodName(arguments).call()
		// 컨트랙트 CALL 메서드 호출을 위와 같이 할 수 있음
		// count라는 메서드가 있다고 하면 아래와 같이 호출 가능
		// ex:) this.countContract.methods.count().call()
		// promise를 반환하니까, .then()이나 async-await 써라
		const participant = await this.shareContract.methods.getParticipant().call();
		this.setState({participant});
	}

	render() {
		return (
			<div>
				<div>
					<button onClick={this.isEmptyPartyCheck}>빈 방 확인</button>
				</div>
				<div>
					<button onClick={this.getParticipant}>확인</button>
					{this.state.participant}
				</div>
			</div>
		)
	}
}

class PartyContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			party: '',
			loading: true
		}
	}

	async componentDidMount() {
		try {

			//const result = await BlockChainApi.getVersion();
			//this.setState({party: result});
		} finally {
			this.setState({loading:false});
		}
	}

	render() {
		const {party, loading} = this.state;
		return (
			<>
				<ShareContract/>
				<PartyPresenter
					party = {party}
					loading = {loading}
				/>
			</>
			
		);
	}
}

export default PartyContainer;