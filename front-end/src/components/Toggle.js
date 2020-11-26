import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Toggle({
  visible,
  onClose,
  maskClosable,
  children
}) {
  const onMaskClick = (e) => {
	if (onClose && e.target === e.currentTarget) {
	  	onClose(e)
		}
  }

  return (
	<>
		<ModalWrapper
			//className={className}
			onClick={maskClosable ? onMaskClick : null}
			visible={visible}>
		</ModalWrapper>
		<ModalInner visible={visible}>
		  {children}
		</ModalInner>
	</>
  )
}

Toggle.propTypes = {
  maskClosable: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  outline: 0;
`

const ModalInner = styled.div`
	visibility: ${(props) => (props.visible ? "visible" : "hidden")};
	position: relative;
	background-color: white;
	border: 1px solid;
	width: 300px;
	height: auto;
	z-index: 1000;
	border-radius: 25px;
	margin-top: 20px;
	padding: 0px 30px;
`

export default Toggle;