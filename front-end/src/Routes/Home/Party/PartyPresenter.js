import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'Components/Loader';
import styled from 'styled-components';
import Message from 'Components/Message';

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

const Owner = ({error, isOwner}) => {
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
						<Button>
							파티 해체
						</Button> : null}
						</>
					</ButtonList>
				</>
			)}
		</Wrapper>
	)
}

const Me = ({error, user, getPartyOut}) => {
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
							{user.curr === '매칭 검증' ? 
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

const PartyPresenter = ({isOwner, me, participants, startTime, people, vote, cons, loading, error, createVote }) => (
	loading ? <Loader /> : (
		<PresenterWrapper>
			<Container>
				<Owner error={error} isOwner={isOwner}/>
				{
					isOwner === false ?
						<Me error={error} user={me} getPartyOut={this.getPartyOut} />
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
					<BottomButton onClick={this.createVote}>투표제기</BottomButton> :
					people === 4 ?
						<BottomButton onClick={this.startParty}>파티 시작</BottomButton> :
						null
					
			}
		</PresenterWrapper>
	)
)

PartyPresenter.propTypes = {
	isOwner: PropTypes.bool.isRequired,
	startTime: PropTypes.string.isRequired,
	people: PropTypes.string.isRequired,
	vote: PropTypes.string.isRequired,
	cons: PropTypes.string.isRequired,
	loading: PropTypes.bool
}

export default PartyPresenter;