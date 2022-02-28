import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../../themes';
import { scale } from '../../../utils';

export const OnSale = ({ sale_ratio }) => {
    return (
        <Wrapper>
            <Percentage>{sale_ratio}%</Percentage>
            <Title>OFF</Title>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    height: ${scale(50)}px;
    width: ${scale(50)}px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: ${colors.brand.tertiary};
    border-radius: 5px;
    padding: ${scale(8)}px;
    color: ${colors.brand.primaryBg};
    position: relative;
    elevation: 3;
    z-index: 3;
`;

const Title = styled.Text`
    font-size: ${scale(12)}px;
    color: ${colors.brand.primaryBg};
`;
const Percentage = styled.Text`
    font-size: ${scale(12)}px;
    color: ${colors.brand.primaryBg};
`;
