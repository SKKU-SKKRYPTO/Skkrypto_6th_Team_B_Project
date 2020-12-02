import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRoute ({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render = {props => 
				!sessionStorage.getItem('walletInstance') ? (
					<Component {...props} />
				) : ( 
					<Redirect to={{
							pathname: '/home', 
							state: {from: props.location}
						}}
					/>
				)
			}
		/>
	)
}

export default PublicRoute;