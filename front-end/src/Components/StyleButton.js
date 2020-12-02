import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    font-size: 20px;
    padding: 10px 70px;
    background-color: #FF166B;
    border: 0px;
    box-shadow: 1px 3px 2px gray;
    border-radius: 10px;
`;

const StyleButton = ({e, children}) => {
    return (
        <Button onClick={e}>
            {children}
        </Button>
    );
}

export default StyleButton;