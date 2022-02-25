import React, { useState, useRef } from 'react';
import {
    SearchBase,
    SearchComponent,
    SearchBox
} from '@appbaseio/react-native-searchbox';
import { MaterialIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    Modal
} from 'react-native';

import Footer from './footer';
import Filters from './filters';

const renderResultItem = ({ item }) => {
    return (
        <View style={styles.itemStyle}>
            {item.images[0] && (
                <Image
                    style={styles.image}
                    source={{
                        uri: item.images[0].src
                    }}
                    resizeMode="contain"
                />)}
            <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>{`${item.title} ${item.is_on_sale ? '(On Sale)' : ''}`}</Text>
                <Text style={styles.textStyle}>{`$${Number(item.original_price / 100).toFixed(2)}`}</Text>
            </View>
        </View>
    );
};

const renderItemSeparator = () => {
    return (
        // Flat List Item Separator
        <View style={styles.itemSeparator} />
    );
};

export default function App() {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <SearchBase
                index="products-dev"
                credentials="546d75763354:6f486621-ce07-473c-95bd-6f55394745dd"
                url="https://shophopper-poc-qhspmwv-arc.searchbase.io"
                appbaseConfig={{
                    recordAnalytics: true,
                    enableQueryRules: true,
                }}
            >
                <SearchBox
                    id="search-component"
                    dataField={[
                        {
                            field: 'title',
                            weight: 3
                        },
                        {
                            field: 'business_name',
                            weight: 1
                        }
                    ]}
                    renderNoSuggestion={() => <Text>No suggestions found</Text>}
                    // autosuggest={false}
                    enableRecentSearches
                    // showAutoFill={false}
                    enablePopularSuggestions
                    maxPopularSuggestions={3}
                    goBackIcon={props => <Ionicons {...props} />}
                    autoFillIcon={props => <Feather name="arrow-up-left" {...props} />}
                    recentSearchIcon={props => (
                        <MaterialIcons name="history" {...props} />
                    )}
                    searchBarProps={{
                        platform: 'android',
                        searchIcon: props => <MaterialIcons name="search" {...props} />,
                        clearIcon: props => <MaterialIcons name="clear" {...props} />
                    }}
                />
                <SearchComponent
                    id="result-component"
                    dataField="title"
                    size={10}
                    react={{
                        and: ['search-component', 'store-filter']
                    }}
                    preserveResults
                >
                    {({ results, loading, size, from, setValue, setFrom }) => {
                        return (
                            <View>
                                {loading && !results.data.length ? (
                                    <ActivityIndicator
                                        style={styles.loader}
                                        size="large"
                                        color="#000"
                                    />
                                ) : (
                                    <View>
                                        {!results.data.length ? (
                                            <Text style={styles.resultStats}>No results found</Text>
                                        ) : (
                                            <View style={styles.resultContainer}>
                                                <Text style={styles.resultStats}>
                                                    {results.numberOfResults} results found in{' '}
                                                    {results.time}ms
                                                </Text>
                                                <FlatList
                                                    data={results.data}
                                                    keyboardShouldPersistTaps={'handled'}
                                                    keyExtractor={item => item._id}
                                                    ItemSeparatorComponent={renderItemSeparator}
                                                    renderItem={renderResultItem}
                                                    onEndReached={() => {
                                                        const offset = (from || 0) + size;
                                                        if (results.numberOfResults > offset) {
                                                            setFrom((from || 0) + size);
                                                        }
                                                    }}
                                                    onEndReachedThreshold={0.5}
                                                    ListFooterComponent={
                                                        loading ? (
                                                            <ActivityIndicator size="large" color="#000" />
                                                        ) : null
                                                    }
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}
                            </View>
                        );
                    }}
                </SearchComponent>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showFilter}
                    onRequestClose={() => {
                        setShowFilter(false);
                    }}
                >
                    <SafeAreaView style={styles.container}>
                        <Filters />
                        <Footer showFilter={showFilter} setShowFilter={setShowFilter} />
                    </SafeAreaView>
                </Modal>
            </SearchBase>
            <Footer showFilter={showFilter} setShowFilter={setShowFilter} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    loader: {
        marginTop: 50
    },
    itemSeparator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8'
    },
    image: {
        width: 100,
        marginRight: 10
    },
    itemStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        height: 170
    },
    star: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    textStyle: {
        flexWrap: 'wrap',
        paddingBottom: 5
    },
    resultStats: {
        padding: 10
    },
    rating: {
        marginLeft: 10
    }
});

