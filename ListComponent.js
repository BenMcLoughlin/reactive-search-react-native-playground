import React from 'react';
import styled from 'styled-components/native';

export const ListComponent = (props) => {
    console.log('/ListComponent.js - props: ', props);
    return (
        <Wrapper>
            <Title>ListComponent</Title>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Title = styled.Text`
    flex: 1;
    font-size: 50px;
`;

/*
class ListComponent extends Component {
    setValue(value) {
        this.props.setQuery({
            query: {
                term: {
                    original_title: value
                }
            },
            value
        });
    }

    render() {
        if (this.props.aggregations) {
            console.log('/ListComponent.js - this.props.aggregations: ', this.props.aggregations);
            return this.props.aggregations['original_title.raw'].buckets.map((item) => (
                <TouchableWithoutFeedback key={item.key} onPress={() => this.setValue(item.key)}>
                    <View
                        style={{
                            height: 50,
                            flex: 1,
                            backgroundColor: '#eee',
                            marginTop: 2,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text>{String(item.key).toUpperCase()}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ));
        }

        return null;
    }
}

export default ListComponent;
*/
