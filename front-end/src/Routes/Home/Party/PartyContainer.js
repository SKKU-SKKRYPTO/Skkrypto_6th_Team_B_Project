import React from 'react';
import PartyPresenter from './PartyPresenter';
import caver from 'caver';
import DEPLOYED_ABI from 'deployedABI.json';
import DEPLOYED_ADDRESS from 'deployedAddress.json';
import styled from 'styled-components';
import Message from 'Components/Message';
import Loader from 'Components/Loader';
import Modal from 'react-awesome-modal';
import logo from "Images/logo.png";
import closeButton from "Images/closeButton.png";

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

const CenterButton = styled.button`
	font-size: 20px;
	padding: 15px 45px;
	margin: 10px auto;
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
	height: 400px;
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

const Title = styled.span`
	font-size: 20px;
	font-weight: bold;
`;

const FlexWrapper = styled.div`
	margin: 0 5px;
	padding: 30px;
	border-radius: 25px;
	background-color: #FAFAFA;
	border: 0px;
    box-shadow: 1px 3px 2px gray;
	text-align: center;
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

const VoteContent = styled.div`
	margin: 0 5px;
	padding: 30px;
	border-radius: 25px;
	background-color: #FAFAFA;
	border: 0px;
    box-shadow: 1px 3px 2px gray;
	text-align: center;
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

/*modal*/
const ModalContainer = styled.div`
	display: grid;
    grid-template-rows: 3;
`

const ModalHeader = styled.div`
	display: flex;
`;

const ModalLogo = styled.img`
	width: 250px;
    height: 250px;
    padding-left: 50px;
`;

const ModalCloseButton = styled.img`
	position: relative;
    top: 35px;
    left: 400px;
    width: 35px;
    height: 35px;
`;

const ModalHeaderH2 = styled.h2`
	position: relative;
    top: 202px;
    left: 93px;
    margin: 0;
    font-size: 20px;
`;    

const ModalInput = styled.div`
	position: relative;
    display: grid;
    grid-template-rows: 2;
    width: 500px;
    padding: 0 250px;
`;

const ModalReason = styled.div`
	display: flex;
    padding-bottom: 15px;
    align-items: center;
`;

const ModalInputLabel = styled.label`
	font-weight: 600;
    font-size: 20px;
    flex: 1;
    text-align: left;
`;

const ModalInputReason = styled.input`
	background-color: #F4F5F7;
    width: 280px;
    height: 48px;
    border: none;
    outline-style: none;
`;

const CreateVote = styled.div`
	position: relative;
    width: 200px;
    height: 65px;
    text-align: center;
    left: 400px;
    /* background-color: #FF166B; */
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    justify-content: center;

    margin-top: 10px;
`;

const CreateVoteButton = styled.button`
	background-color: #FF166B;
    border: none;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-decoration: none;
    padding: 20px;
    color: black;
    cursor: pointer;
    width: 200px;
    border-radius: 10px;
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
							{user.curr === '매칭 검증' && startTime.getTime() === 0 ? 
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
			isBreak: false,
			isFinish: false,
			startTime: null,
			endTime: null,
			people: 0,
			votePeople: 0,
			cons: 0,
			reason: '',
			isVoted: false,
			loading: true,
			error: null,
			isPartyPage: true,
			isModalVisible: false
		};
		this.getPartyOut = this.getPartyOut.bind(this);
		this.startParty = this.startParty.bind(this);
		this.openVotePage = this.openVotePage.bind(this);
		this._openModal = this._openModal.bind(this);
		this._closeModal = this._closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.createVote = this.createVote.bind(this);
		this.votingYes = this.votingYes.bind(this);
		this.votingNo = this.votingNo.bind(this);
		this.withdrawBreakParty = this.withdrawBreakParty.bind(this);
		this.breakUpParty = this.breakUpParty.bind(this);
	}

	async componentDidMount() {
		try {
			const party = await this.shareContract.methods.getPartyInfo().call({ from: this.walletAddress });
			const isValid = party[0] !== "0" ? true : false;
			const startTime = new Date(parseInt(party[3]) * 1000);
			const endTime = new Date(parseInt(party[4]) * 1000);
			const now = new Date();
			if (startTime.getTime() !== 0 && endTime < now) { // 파티원: 파티가 종료된 경우
				this.setState({ isFinish: true });
			} else
				this.setState({ isFinish: false });
			this.setState({ isValid: isValid, isOwner: party[1], isBreak: party[2], startTime: startTime,
				endTime: endTime, people: parseInt(party[5]), votePeople: parseInt(party[6]),
				cons: parseInt(party[7]), reason: party[8], isVoted: party[9] });
		} catch {
			this.setState({
				error: "클레이튼 노드와 통신중에 에러가 발생했어요."
			});
		} finally {
			this.setState({ loading:false });
		}
	}

	openVotePage() {
		this.setState({ isPartyPage:false });
	}

	_openModal() {
		this.setState({ isModalVisible: true });
	}

	_closeModal() {
		this.setState({ isModalVisible: false });
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value,
		})
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

	async createVote() {
		try {
			await this.shareContract.methods.createVote(this.state.reason).send({ from: this.walletAddress, gas: '200000' });
			alert("투표를 시작했어요.");
		} catch {
			alert("투표를 시작하지 못했어요.");
		}
	}

	async votingYes() {
		try {
			await this.shareContract.methods.voting(true).send({ from: this.walletAddress, gas: '200000' });
			this.setState({ votePeople: this.state.votePeople + 1 });
			alert("투표했어요.");
		} catch {
			alert("문제가 생겨서 투표하지 못했어요😥");
		}
	}

	async votingNo() {
		try {
			await this.shareContract.methods.voting(false).send({ from: this.walletAddress, gas: '200000' });
			this.setState({ votePeople: this.state.votePeople + 1, cons: this.state.cons + 1 });
			alert("투표했어요.");
		} catch {
			alert("문제가 생겨서 투표하지 못했어요😥");
		}
	}

	async withdrawBreakParty() {
		try {
			await this.shareContract.methods.withdrawBreakParty().send({ from: this.walletAddress, gas: '200000' });
			alert("송금이 완료되었습니다.");
		} catch {
			alert("문제가 생겨서 송금하지 못했어요😥");
		}
	}

	async breakUpParty() {
		try {
			await this.shareContract.methods.breakUpParty().send({ from: this.walletAddress, gas: '200000' });
			alert("환불이 완료되었습니다.");
		} catch {
			alert("문제가 생겨서 환불하지 못했어요😥")
		}
	}

	render() {
		const {
			isValid,
			isOwner,
			isBreak,
			isFinish,
			startTime,
			endTime,
			people,
			votePeople,
			cons,
			reason,
			isVoted,
			loading,
			error,
			isPartyPage,
			isModalVisible
		} = this.state;
		const me = {curr: "매칭 검증"};

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
							isBreak ? (
								<PresenterWrapper>
									<Container>
										<FlexWrapper>
											{
												isOwner ? (
													<>
														<Notion>
															투표 결과에 의해 파티가 폭파되었습니다. 아래 버튼을 눌러 송금받으세요.
														</Notion>
														<CenterButton onClick={this.withdrawBreakParty} >
															송금하기
														</CenterButton>
													</>
												) : (
													<>
														<Notion>
															투표 결과에 의해 파티가 폭파되었습니다. 아래 버튼을 눌러 환불을 받으세요.
														</Notion>
														<CenterButton onClick={this.breakUpParty}>
															환불받기
														</CenterButton>
													</>
												)
											}
										</FlexWrapper>
									</Container>
								</PresenterWrapper>
							) :
							(
								isFinish ? (
									<div>끝났어요</div>
								) : (
									<PresenterWrapper>
										<Title>
											공지사항
											{
												startTime.getTime() !== 0 ? <div>파티가 {(startTime.getMonth() + 1) + "월 " + startTime.getDate() + "일"}에 시작되어 {(endTime.getMonth() + 1) + "월 " + endTime.getDate() + "일"}에 끝나요.</div> : null
											}
											{
												votePeople !== 0 ?
													votePeople !== 4 ?
														<div>투표가 진행중이에요 !</div>
													: <div>투표가 종료되었어요 ! 반대가 많아 폭파되지 않았어요</div>
												: null
											}
										</Title>
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
											startTime.getTime() !== 0 ?
												<BottomButton onClick={this.openVotePage}>투표현황</BottomButton> :
												people === 4 ?
													<BottomButton onClick={this.startParty}>파티 시작</BottomButton> :
													null
										}
									</PresenterWrapper>
								)
							)
						) : (
							<PresenterWrapper>
								<Container>
									<FlexWrapper>
										참가중인 파티가 없어요.
									</FlexWrapper>
								</Container>
							</PresenterWrapper>
						)
					) :
					(
						<PresenterWrapper>
							<Container>
								{ votePeople !== 0 ? (
									<VoteWrapper>
										<Notion>
											현재 투표
										</Notion>
										<VoteContent>
											<Notion>
												투표 현황: {votePeople}명 참가
											</Notion>
											<Notion>
												투표 사유: {reason}
											</Notion>
											<Notion>
												반대 인원: {cons}명
											</Notion>
											{
												isVoted ? (
													votePeople === 4 && cons >= 2 ?
													<CenterButton onClick={() => { alert("재투표는 현재 버전에서 불가능해요. 신중하게 했어야죠😝"); }}>
														투표 다시 만들기
													</CenterButton> :
													<Notion>
														투표를 이미 진행했어요
													</Notion>
												) : (
													<>
														<CenterButton onClick={this.votingYes}>
															찬성 투표
														</CenterButton>
														<CenterButton onClick={this.votingNo}>
															반대 투표
														</CenterButton>
													</>
												)
											}
										</VoteContent>
									</VoteWrapper>
									) : <VoteWrapper>
										<Notion>
											<Wrapper>
												진행중인 투표가 없어요.
												<Button onClick={() => this._openModal()}>
													투표 만들기
												</Button>
												<Modal className="account-modal"
													visible={isModalVisible}
													width="1000" height="500"
													effect="fadeInUp"
													onClickAway = {() => this._closeModal()}>
													<ModalContainer>
														<ModalHeader>
															<ModalLogo src={logo} alt="로그인 폼의 로고 이미지"/>
															<ModalHeaderH2>투표 이유 입력</ModalHeaderH2>
															<ModalCloseButton src={closeButton} onClick={()=>this._closeModal()} alt="닫기 버튼"/>
														</ModalHeader>
														<ModalInput>
															<ModalReason>
																<ModalInputLabel>투표 사유 </ModalInputLabel>
																<ModalInputReason type="text" name="reason" onChange={this.handleChange}/>
															</ModalReason>
														</ModalInput>
														<CreateVote>
															<CreateVoteButton onClick={this.createVote}>투표 시작</CreateVoteButton>
														</CreateVote>
													</ModalContainer>
												</Modal>
											</Wrapper>
										</Notion>
									</VoteWrapper>
								}
							</Container>
						</PresenterWrapper>
					)
				)
		)
	}
}

export default PartyContainer;