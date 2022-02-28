import React, { useState, useRef, Children, cloneElement } from 'react';
import { ScrollView, Animated } from 'react-native';
import styled from 'styled-components/native';
import { scale } from '../../utils';
import { MaterialCommunityIcons as Chevron } from '@expo/vector-icons';
import { colors } from '../../themes/colors';

export const Accordion = ({ children, filtersOpensTo }) => {
    const [selectedIndex, setCurrentIndex] = useState(filtersOpensTo);
    const ref = useRef();

    return (
        <ScrollView>
            <Container ref={ref}>
                {Children.map(children, (child, index) => {
                    const isSelected = index === selectedIndex;
                    return cloneElement(
                        <Wrapper key={index}>
                            <ClickableHeader
                                onPress={() => {
                                    setCurrentIndex(isSelected ? null : index);
                                }}>
                                <Title>{child.props.title}</Title>
                                <Rotate45 style={{ transform: [{ rotate: isSelected ? '90deg' : '0deg' }] }}>
                                    <Chevron name="chevron-right" size={24} color="black" />
                                </Rotate45>
                            </ClickableHeader>
                            <Card>{isSelected && <Content>{child}</Content>}</Card>
                        </Wrapper>
                    );
                })}
            </Container>
        </ScrollView>
    );
};

const Container = styled.View`
    flex: 1;
    margin-top: 100px;
`;

const Wrapper = styled.View`
    flex-grow: 1;
    border-bottom-width: ${scale(1)}px;
    border-bottom-color: ${colors.grey.light};
`;
const Hr = styled.View`
    height: 1px;
    background: ${colors.grey.light};
`;
const Title = styled.Text`
    flex: 0.6;
    font-size: ${scale(16)}px;
    overflow: hidden;
`;

const Rotate45 = styled(Animated.View)`
    width: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`;
const ClickableHeader = styled.TouchableOpacity`
    flex-direction: row;
    height: ${scale(50)}px;
    justify-content: space-between;
    align-items: center;
    padding-left: ${scale(15)}px;
    padding-right: ${scale(25)}px;
    overflow: hidden;
`;

const Card = styled.View`
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;
const Content = styled.View`
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    width: 100%;
    width: 100%;
    background: ${(p) => (p.isSelected ? 'red' : 'white')};
`;
