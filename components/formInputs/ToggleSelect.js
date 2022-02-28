import React from 'react';
import styled from 'styled-components/native';
import { scale, startCase } from '../../utils';
import { colors } from '../../themes/colors';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export const ToggleSelect = ({ label, value, onValueChange, size = 7, showCloseIcon, count }) => {
    return (
        <Wrapper label={label} onPress={(option) => onValueChange(option)} isSelected={value} size={size}>
            <Label isSelected={value} size={size}>
                {startCase(label)}
            </Label>
            <Count size={size}>({count})</Count>
            {showCloseIcon && <Close name="close" size={15} color={'grey'} />}
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.TouchableOpacity`
    flex-direction: column;
    background: ${(p) => (p.isSelected ? '#F4CFC6' : colors.ui.white)};
    border-radius: ${(p) => scale(p.size)}px;
    margin-right: ${(p) => scale(p.size)}px;
    min-width: ${(p) => scale(p.size * 12)}px;

    min-height: ${(p) => scale(p.size * 6)}px;
    justify-content: center;
    align-items: center;
    margin-top: ${(p) => scale(p.size)}px;
    padding-left: ${(p) => scale(p.size)}px;
    padding-right: ${(p) => scale(p.size)}px;
    border: 1px solid ${(p) => (p.isSelected ? '#D3ABA3' : colors.grey.medium)};
`;

const Label = styled.Text`
    color: ${colors.grey.darkest};
    font-weight: normal;
    font-size: ${(p) => scale(Math.max(p.size * 1.2, 10))}px;
`;
const Count = styled.Text`
    color: ${colors.grey.darkest};
    font-weight: normal;
    font-size: ${(p) => scale(Math.max(p.size * 1.2, 7))}px;
    margin-top: 4px;
`;
const Close = styled(Icon)`
    height: 15px
    width: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 2px;
`;
