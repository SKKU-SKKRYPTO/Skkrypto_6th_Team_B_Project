import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'Components/Loader';
import styled from 'styled-components';
import Wrapper from 'Components/Wrapper';

const Button = styled.button`
    font-size: 20px;
    padding: 10px 70px;
    background-color: #FF166B;
    border: 0px;
    box-shadow: 1px 3px 2px gray;
    border-radius: 10px;
`;

const Container = styled.div`
    display: flex;
`;

const PartyPresenter = ({party, loading}) => (
    loading ? <Loader /> : (
        <Container>
            {party}
            이게 너의 파티야.
            <Wrapper>
                <Button>
                    매칭 검증
                </Button>
            </Wrapper>
        </Container>
    )
)

PartyPresenter.propTypes = {
    party: PropTypes.string,
    loading: PropTypes.bool
}

export default PartyPresenter;