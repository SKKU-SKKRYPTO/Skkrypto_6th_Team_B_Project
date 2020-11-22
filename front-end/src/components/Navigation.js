import React from 'react';
import { Link } from "react-router-dom";
import logo from "Images/logo.png";
import styled from "styled-components";

const Nav = styled.div`
	display: flex;
	/* position: absolute; */
	width: 100%;
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

function Navigation() {
	return (
		<Nav>
			<Logo>
				<img src ={logo} width="300" height="300"/>
			</Logo>
			<Menu>
				<List>
					<Item>
						<MenuLink to="/matching" >매칭 서비스</MenuLink>
					</Item>
					<Item>
						<MenuLink to="/introduction" >서비스 소개</MenuLink>
					</Item>
					<Item>
						<MenuLink to="/mypage" >마이페이지</MenuLink>
					</Item>
				</List>
			</Menu>
		</Nav>
	);
}

export default Navigation;