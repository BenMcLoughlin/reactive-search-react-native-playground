import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { ReactiveBase, DataSearch, ReactiveList, MultiDropdownRange } from '@appbaseio/reactivesearch-native';
import styled from 'styled-components/native';

export default class App extends React.Component {
    render() {
        return (
            <ReactiveBase
                credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
                url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
                app="good-books-ds"
                credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
                enableAppbase>
                <View style={styles.container}>
                    <Searchbar
                        componentId="searchbox"
                        dataField={['original_title', 'original_title.search', 'authors', 'authors.search']}
                        placeholder="Search for books"
                    />
                    {/* <MultiDropdownRange
                        componentId="MultiDropdownRangeSensor"
                        dataField="average_rating"
                        data={[
                            { start: 0, end: 3, label: 'Rating < 3' },
                            { start: 3, end: 4, label: 'Rating 3 to 4' },
                            { start: 4, end: 5, label: 'Rating > 4' }
                        ]}
                    /> */}
                    <ReactiveList
                        componentId="searchResult"
                        dataField="original_title"
                        size={19}
                        onData={(res, i) => (
                            <View style={styles.result} key={i}>
                                <Image source={{ uri: res.image }} style={styles.image} />
                                <View style={styles.item}>
                                    <Text style={styles.title}>{res.original_title}</Text>
                                    <Text>{res.authors}</Text>
                                </View>
                            </View>
                        )}
                        pagination
                        showResultStats={false}
                        react={{
                            and: ['bookSensor']
                        }}
                    />
                </View>
            </ReactiveBase>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: 100,
        height: 100
    },
    result: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        alignItems: 'center'
    },
    item: {
        flexDirection: 'column',
        paddingLeft: 10
    },
    title: {
        fontWeight: 'bold'
    }
});

const Wrapper = styled.View`
    background: yellow;
    height: 100px;
    width: 100px;
`;
const Searchbar = styled(DataSearch)``;
