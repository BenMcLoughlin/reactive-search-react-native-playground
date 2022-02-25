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
  },
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
          }}
        >
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText} onPress={applyFilters}>
              Apply
            </Text>
          </View>

          <View style={styles.separator} />
          <View style={styles.footerTextContainer}>
            <Text
              style={styles.footerText}
              onPress={() => setShowFilter(!showFilter)}
            >
              Close
            </Text>
          </View>
        </View>
      ) : (
        <Text
          style={styles.footerText}
          onPress={() => setShowFilter(!showFilter)}
        >
          Filters
        </Text>
      )}
    </View>
  );
};

export default Footer;