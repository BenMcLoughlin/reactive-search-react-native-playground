import React, { useContext } from 'react';
import { SearchContext } from '@appbaseio/react-native-searchbox';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
    separator: {
        height: 40,
        marginVertical: 5,
        borderRightWidth: 1,
        borderRightColor: '#fff'
    },
    footerContainer: {
        bottom: 0,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#000',
        height: 60,
        color: 'yellow'
    },
    footerText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
        marginTop: 10
    },
    footerTextContainer: {
        flex: 1,
        alignSelf: 'flex-start'
    }
});

const Footer = ({ showFilter, setShowFilter }) => {
    const searchBase = useContext(SearchContext);
    const applyFilters = () => {
        const filterInstance = searchBase.getComponent('store-filter');
        if (filterInstance) {
            filterInstance.triggerCustomQuery();
        }
        setShowFilter(false);
    };
    return (
        <View style={styles.footerContainer}>
            {showFilter ? (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText} onPress={applyFilters}>
                            Apply
                        </Text>
                    </View>

                    <View style={styles.separator} />
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText} onPress={() => setShowFilter(false)}>
                            Close
                        </Text>
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText} onPress={() => setShowFilter('V1')}>
                            Filters-V1
                        </Text>
                    </View>

                    <View style={styles.separator} />
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText} onPress={() => setShowFilter('V2')}>
                            Filters-V2
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Footer;
