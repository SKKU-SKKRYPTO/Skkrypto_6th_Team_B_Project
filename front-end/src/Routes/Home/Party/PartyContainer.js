import React from 'react';
import PartyPresenter from './PartyPresenter';
import caver from 'caver';
import DEPLOYED_ABI from 'deployedABI.json';
import DEPLOYED_ADDRESS from 'deployedAddress.json';
import styled from 'styled-components';
import Message from 'Components/Message';
import Loader from 'Components/Loader';
import Modal from 'react-awesome-modal';

const PresenterWrapper = styled.div`
	text-align: center;
`;

const BottomButton = styled.button`
font-size: 20px;
	padding: 15px 50px;
	margin: 25px 0 0 0;
	border: 0px;
	color: #FFFFFF;
	box-shadow: 1px 3px 2px gray;
	font-weight: bold;
	border-radius: 10px;
	background-color: #000000;
`;

const Button = styled.button`
	font-size: 20px;
	padding: 15px 45px;
	margin: 10px 20px;
	background-color: #FF166B;
	border: 0px;
	box-shadow: 1px 3px 2px gray;
	font-weight: bold;
	display: block;
	border-radius: 10px;
`;

const OwnerContent = styled.div`
	
`;

const ButtonList = styled.div`
	display: flex;
	height: 450px;
	justify-content: center;
	align-items: flex-end;
`;

const Identity = styled.div`
	box-shadow: 1px 3px 2px gray;
	background-color: #FFFFFF;
	font-size: 25px;
	border-radius: 10px;
	margin: 0 40px 0 40px;
	padding: 15px;
	position: relative;
	top: 40px;
	font-weight: bold;
`;

const Notion = styled.span`
	font-size: 20px;
	padding: 15px 45px;
	margin: 10px 20px;
	font-weight: bold;
	display: block;
`;

const Wrapper = styled.div`
	margin: 0 5px;
	padding: 30px;
	width: 230px;
	border-radius: 25px;
	background-color: #FAFAFA;
	border: 0px;
    box-shadow: 1px 3px 2px gray;
	text-align: center;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	padding: 50px 0 0 0;
`;

const VoteWrapper = styled.div`
	text-align: center;
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

const Owner = ({error, isOwner, getPartyOut}) => {
	return (
		<Wrapper>
			{error ? (<Message text={error} color="red" />) : (
				<>
					<Identity>
						파티장{isOwner ? ' (나)' : null}
					</Identity>
					<ButtonList>
						<>
						{isOwner ? 
						<Button onClick={getPartyOut}>
							파티 해체
						</Button> : null}
						</>
					</ButtonList>
				</>
			)}
		</Wrapper>
	)
}

const Me = ({error, user, getPartyOut, startTime}) => {
	return (
		<Wrapper>
			{error ? (<Message text={error} color="red" />) : (
				<>
					<Identity>
						나
					</Identity>
					<ButtonList>
						<div>
							<Notion>
								{user.curr}
							</Notion>
							{user.curr === '매칭 검증' && startTime === 0 ? 
							(
								<Button onClick={getPartyOut}>
									매칭 취소
								</Button>
							) : null}
						</div>
					</ButtonList>
				</>
			)}
		</Wrapper>
	)
}

const User = ({num, error, user}) => {
	return (
		<Wrapper>
			{error ? (<Message text={error} color="red" />) : (
				<>
					<Identity>
						파티원{num}
					</Identity>
					<ButtonList>
						<Notion>
							{user.curr}
						</Notion>
					</ButtonList>
				</>
			)}
		</Wrapper>
	)
}

const CurrentVote = ({vote}) => {
	return (
		<VoteWrapper>
			<div>
				현재 투표
			</div>
			<Wrapper>
				참여 현황: {vote}
			</Wrapper>
		</VoteWrapper>
	)
}

class PartyContainer extends React.Component {
	constructor(props) {
		super(props);
		this.shareContract = DEPLOYED_ABI
			&& DEPLOYED_ADDRESS
			&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS.address);
		this.walletAddress = caver.klay.accounts.wallet.length ? caver.klay.accounts.wallet[0].address : 0 ;
		this.state = {
			isValid: false,
			isOwner: false,
			startTime: '',
			people: '',
			vote: '',
			cons: '',
			loading: true,
			error: null,
			isPartyPage: true
		};
		//this.transfer = this.transfer.bind(this);
		this.getPartyOut = this.getPartyOut.bind(this);
		this.startParty = this.startParty.bind(this);
		this.openVotePage = this.openVotePage.bind(this);
	}

	async componentDidMount() {
		try {
			const party = await this.shareContract.methods.getPartyInfo().call({ from: this.walletAddress });
			const isValid = party[0] !== "0" ? true : false;
			this.setState({ isValid: isValid, isOwner: party[1], startTime: parseInt(party[2]), people: parseInt(party[3]), vote: parseInt(party[4]), cons: parseInt(party[5]) });
			console.log(party);
		} catch {
			this.setState({
				error: "클레이튼 노드와 통신중에 에러가 발생했어요."
			});
		} finally {
			this.setState({ loading:false });
		}
	}

	/*
	async transfer() {
		try {
			const result = await this.shareContract.methods.getPartyInfo().call({ from: this.walletAddress });
		} catch {
			alert("송금에 실패했어요. 잔액을 확인해주세요.");
		} finally {
			console.log("transfer 실행");
		}
	}
	*/

	openVotePage() {
		this.setState({ isPartyPage:false });
	}
	
	async startParty() {
		if (this.state.isOwner) {
			try {
				await this.shareContract.methods.startParty().send({ from: this.walletAddress, gas: '200000'});
			} catch {
				alert("파티를 시작하지 못했어요😥");
			} finally {
				alert("파티가 시작되었어요.");
			}
		} else {
			alert("방장만 파티를 시작할 수 있어요.");
		}
	}

	async getPartyOut() {
		try {
			alert("들어올때는 마음대로지만 나갈때는 아니에요.");
		} catch {
			alert("실패했어요.");
		} finally {
			console.log("getOut 끝");
		}
	}

	render() {
		const { isValid, isOwner, startTime, people, vote, cons, loading, error, isPartyPage } = this.state;
		const me = {curr: "매칭 검증"};

		// startTime을 유저 친화적으로 변환
		let timestamp = startTime * 1000;
		let date = new Date(timestamp);
		console.log(date);

		const participants = [];
		if (isOwner) {
			for (let i = 1; i < people; i++) {
				participants.push({curr: "매칭 검증"});
			}
			for (let i = people; i < 4; i++) {
				participants.push({curr: "매칭중..."});
			}
		} else {
			for (let i = 2; i < people; i++) {
				participants.push({curr: "매칭 검증"});
			}
			for (let i = people; i < 4; i++) {
				participants.push({curr: "매칭중..."});
			}
		}
		return (
			loading ?
				<Loader /> :
				(
					isPartyPage ?
					(
						isValid ? (
							<PresenterWrapper>
								<Container>
									<Owner error={error} isOwner={isOwner} getPartyOut={this.getPartyOut}/>
									{
										isOwner === false ?
											<Me error={error} user={me} getPartyOut={this.getPartyOut} startTime={startTime} />
										: null
									}
									<User num={1} error={error} user={participants[0]}/>
									<User num={2} error={error} user={participants[1]}/>
									{
										isOwner === true ?
											<User num={3} error={error} user={participants[2]}/>
										: null
									}
								</Container>
								{
									// 파티가 시작했으면 투표버튼 활성화
									startTime !== 0 ?
										<BottomButton onClick={this.openVotePage}>투표현황</BottomButton> :
										people === 4 ?
											<BottomButton onClick={this.startParty}>파티 시작</BottomButton> :
											null
								}
							</PresenterWrapper>
						) :
						<PresenterWrapper>
							<Container>
								<div>
									참가중인 파티가 없어요.
								</div>
							</Container>
						</PresenterWrapper>
					) :
					(
						<PresenterWrapper>
							<Container>
								<CurrentVote vote={vote}/>
							</Container>
						</PresenterWrapper>
					)
				)
		)
	}
}

export default PartyContainer;