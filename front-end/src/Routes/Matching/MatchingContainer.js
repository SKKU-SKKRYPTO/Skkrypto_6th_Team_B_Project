import React from 'react';
//import styled from "styled-components";
import Api from "api";
import Button from 'react-bootstrap/Button';

const MatchingContainer = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			now: ""
		};
}

async componentDidMount() {
	try {
		const {data: now} = await Api.getServerTime();
		console.log(now);
		this.setState({
			now
		})
	} catch {
		this.setState({
			now: "error"
		})
	}
}

render() {
	return (
			<div>
				<h1>Hello, world!</h1>
				<h2>{this.state.now}</h2>
				<h1>백엔드 서버시간이에요!</h1>
				<Button variant="primary">Primary</Button>{' '}
			</div>
		);
	}
}

export default MatchingContainer;