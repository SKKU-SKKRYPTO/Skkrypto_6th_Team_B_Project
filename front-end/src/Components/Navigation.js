import React from 'react';
import { Link } from "react-router-dom";
import logo from "Images/logo.png";
import styled from "styled-components";
import Toggle from "./Toggle";
import caver from "caver";

const Nav = styled.div`
	display: flex;
	/* position: absolute; */
	height: 200px;
`;

const Logo = styled.div`
	margin: 0px;
	padding-left: 50px;
`;

const Menu = styled.div`
	justify-content: center;
	width: 100%;
	left: 0px;
	top: 0px;
	padding-top: 74px;
	padding-bottom: 76px;
`;

const List = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	
	padding: 0px 30px;
	margin: 0px;
`;

const Item = styled.li`
	padding: 0px 30px;
	/* font-family: LG Smart UI; */
	font-style: normal;
	text-align: center;
	font-weight: bold;
	font-size: 36px;
	line-height: 20px;
`;

const MenuLink = styled(Link)`
	color: #000000;
	text-decoration: none;
	&:hover {
		border-bottom: 3px solid black;
    padding-bottom: 5px;
	}
`;

const ToggleItem = styled.div`
	margin: 40px 0px;
`;

// TODO: 로그아웃 버튼을 누르면 커버화면으로 리다이렉트 시켜주고 싶음
const logOut = () => {
	caver.klay.accounts.wallet.clear()
	sessionStorage.removeItem('walletInstance')
	alert("로그아웃 되었어요.");
}

class DropDownMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false
		};
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
				<MenuLink onClick={this.openModal}>마이페이지</MenuLink>
				{
					<Toggle visible={this.state.modalVisible}
						onClose={this.closeModal}
						maskClosable={true}
						closable={false}>
						<ToggleItem>
							<MenuLink to="/home/setting" onClick={this.closeModal}>
								개인정보 관리
							</MenuLink>
						</ToggleItem>
						<hr />
						<ToggleItem>
							<MenuLink to="/home/party" onClick={this.closeModal}>
								현재 매칭 정보
							</MenuLink>
						</ToggleItem>
						<hr />
						<ToggleItem>
							<MenuLink to="/" onClick={event => {
								logOut();
								this.closeModal();
							}}>
								로그아웃
							</MenuLink>
						</ToggleItem>
					</Toggle>
				}
			</>
		);
	}
}

const Navigation = () => {
	return (
		<Nav>
			<Logo>
				<Link to="/home">
					<img src ={logo} width="300" height="300" alt="홈페이지 로고"/>
				</Link>
			</Logo>
			<Menu>
				<List>
					<Item>
						<MenuLink to="/home" >매칭 서비스</MenuLink>
					</Item>
					<Item>
						<MenuLink to="/home/intro" >서비스 소개</MenuLink>
					</Item>
					<Item>
						<DropDownMenu />
					</Item>
				</List>
			</Menu>
		</Nav>
	);
}

export default Navigation;