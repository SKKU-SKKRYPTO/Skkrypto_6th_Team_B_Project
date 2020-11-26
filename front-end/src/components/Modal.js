import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from 'Images/CloseButton.png';
import logo from "Images/logo.png";

function Modal({
	visible,
	onClose,
	maskClosable,
	closable,
	children
}) {
	const onMaskClick = (e) => {
		if (onClose && e.target === e.currentTarget) {
			onClose(e)
		}
	}

	const close = (e) => {
		if (onClose) {
			onClose(e)
		}
	}
	return (
		<>
			<ModalOverlay visible={visible} />
			<ModalWrapper
				onClick={maskClosable ? onMaskClick : null}
				tabIndex="-1"
				visible={visible}
			>
				<ModalInner tabIndex="0">
					<Logo url={logo} />
					{closable && <CloseButton className="modal-close" iconUrl={CloseIcon} onClick={close} />}
					{children}
				</ModalInner>
			</ModalWrapper>
		</>
	)
}

Modal.propTypes = {
	maskClosable: PropTypes.bool.isRequired,
	closable: PropTypes.bool.isRequired,
	visible: PropTypes.bool.isRequired,
}

const Logo = styled.div`
	height: 120px;
	width:auto;
	background-image: url(${props => props.url});
	background-position: center center;
`;

const CloseButton = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
	width: 35px;
	height: 35px;
	border-radius: 0px;
	cursor: pointer;
	background-image: url(${props => props.iconUrl});
	background-size: cover;
`;

const ModalWrapper = styled.div`
	box-sizing: border-box;
	display: ${(props) => (props.visible ? 'block' : 'none')};
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
	overflow: auto;
	outline: 0;
`

const ModalOverlay = styled.div`
	box-sizing: border-box;
	display: ${(props) => (props.visible ? 'block' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 999;
`

const ModalInner = styled.div`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
	border-radius: 10px;
	max-width: 450px;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 40px 20px;
`

export default Modal;