import React from 'react';
import styled from "styled-components";
import Wrapper from "Components/Wrapper";
import caver from 'caver';

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

const PartyInfo = () => {
	return (
		<div>
			<h1>매칭 계정 정보</h1>
			<div>
				<span>아이디</span>
				<Input type="email" value="" disabled margin='5px 10px'/>
			</div>
			<div>
				<span>비밀번호</span>
				<Input type="text" value="" disabled margin='5px 10px'/>
			</div>
		</div>
	);
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