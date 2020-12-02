import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';

const ModalInner = styled.div`
	margin: ${props => props.margin};
	padding: 30px;
	border-radius: 25px;
	background-color: #FAFAFA;
	border: 0px;
    box-shadow: 1px 3px 2px gray;
	text-align: center;
`;

const Wrapper = ({children, margin}) => (
	<ModalInner margin={margin}>
		{children}
	</ModalInner>
);

Wrapper.propTypes = {
	children: Proptypes.object,
	margin: Proptypes.string.isRequired
}

export default Wrapper;