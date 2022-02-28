import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../../themes';
import { scale } from '../../../utils';

export const SoldOut = ({ sale_ratio }) => {
    return (
        <Wrapper>
            <Title>Sold Out</Title>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    height: ${scale(20)}px;
    width: ${scale(70)}px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: ${colors.brand.tertiary};
    border-radius: 5px;
    padding: ${scale(2)}px;
    color: ${colors.brand.primaryBg};
    position: relative;
    elevation: 3;
    z-index: 3;
`;

const Title = styled.Text`
    font-size: ${scale(12)}px;
    color: ${colors.brand.primaryBg};
    font-weight: bold;
`;
