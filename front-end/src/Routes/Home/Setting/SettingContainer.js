import React from 'react';
import styled from "styled-components";
import Wrapper from "Components/Wrapper";
import caver from 'caver';
import DEPLOYED_ABI from 'deployedABI.json';
import DEPLOYED_ADDRESS from 'deployedAddress.json';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 218px);
`;

const Input = styled.input`
	margin: ${props => props.margin};
	color: rgb(100, 100, 100, 50%);
	font-size: 20px;
	padding: 10px 15px;
	border-radius: 5px;
	border: 0px;
	background-color: #F4F5F7;
`;

class WalletInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({
			modalVisible: true
		});
	}

	closeModal = () => {
		this.setState({
			modalVisible: false
		});
	}

	render() {
		return (
			<>
				<div>
					<h1>
						등록 지갑 정보
					</h1>
					<Input type="text"
						value={caver.klay.accounts.wallet.length
						&& caver.klay.accounts.wallet[0].address}
						disabled margin='10px 0px 35px 0px'/>
				</div>
			</>
		);
	}
}

class PartyInfo extends React.Component {
	constructor(props) {
		super(props);
		this.shareContract = DEPLOYED_ABI
			&& DEPLOYED_ADDRESS
			&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS.address);
		this.walletAddress = caver.klay.accounts.wallet.length ?
		caver.klay.accounts.wallet[0].address : 0;
		this.state = {
			accountId: "",
			accountPw: ""
		}
	}

	async componentDidMount() {
		try {
			const party = await this.shareContract.methods.getPartyInfo().call({ from: this.walletAddress });
			if (party[0] === '0' || (party[3] === '0' && party[1] === false)) {
				// 참여한 파티가 없거나 아직 시작하지 않았는데 방장이 아닐경우
				this.setState({
					accountId: "등록된 계정이 없어요",
					accountPw: "등록된 계정이 없어요"
				})
			} else {
				const account = await this.shareContract.methods.returnAccount().call({ from: this.walletAddress });
				this.setState({
					accountId: account[0],
					accountPw: account[1]
				})
			}
		} catch(error) {
			this.setState({
				accountId: "정보를 불러오는데 에러가 발생했어요😥",
				accountPw: "정보를 불러오는데 에러가 발생했어요😥"
			})
		}
	}

	render() {
		const { accountId, accountPw } = this.state;
		return (
			<div>
				<h1>매칭 계정 정보</h1>
				<div>
					<span>아이디</span>
					<Input type="email" value={accountId} disabled margin='5px 10px'/>
				</div>
				<div>
					<span>비밀번호</span>
					<Input type="text" value={accountPw} disabled margin='5px 10px'/>
				</div>
			</div>
		);
	}
	
}

const SettingContainer = () => {
	return (
		<Container>
			<Wrapper margin='10px 100px 10px 0px'>
				<WalletInfo />
			</Wrapper>
			<Wrapper margin='10px 0px'>
				<PartyInfo />
			</Wrapper>
		</Container>
	);
}

export default SettingContainer;