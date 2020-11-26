import React from "react";
import styled from "styled-components";

const FormModal = styled.div``;

class SignUpForm extends React.Component {
		constructor(props) {
				super(props);
				this.state = {email: '', password: ''};

				this.handleChange = this.handleChange.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleChange(event) {
				this.setState({email: event.target.email, password: event.target.password});
		}

		handleSubmit(event) {
				alert(
					`A form was submitted: ${this.state.email}, ${this.state.password}`
				);
				event.preventDefault();
		}

		render() {
				return (
						<FormModal>
								<form onSubmit={this.handleSubmit}>
										<label>
												이메일
												<input type="email" value={this.state.email} onChange={this.handleChange} />
												패스워드
												<input type="password" value={this.state.password} onChange={this.handleChange} />
										</label>
										<input type="submit" value="submit" />
								</form>
						</FormModal>
				);
		}
}

export default SignUpForm;