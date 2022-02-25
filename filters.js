import React, { useContext } from 'react';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { View, ActivityIndicator, Text, FlatList, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 50,
    paddingRight: 20
  },
  flex1: {
    flex: 1
  },
  loader: {
    marginTop: 50
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 10
  },
});

const renderItemSeparator = () => {
  return (
    // Flat List Item Separator
    <View style={styles.itemSeparator} />
  );
};

const Filters = () => {
  const searchBase = useContext(SearchContext);
  return (
    <View style={styles.filterContainer}>
      <SearchComponent
        id="store-filter"
        type="term"
        dataField="business_name.keyword"
        subscribeTo={['aggregationData', 'requestStatus', 'value']}
        URLParams
        react={{
          and: ['search-component']
        }}
        customQuery={(searchComponent) => {
          if (!searchComponent.value || searchComponent.value.length === 0) {
            return {};
          }

          return ({
            query: {
              terms: {
                'business_name.keyword': searchComponent.value
              }
            }
          })
        }}
        // To initialize with default value
        value={[]}
        // Avoid fetching query if component has already been initialized
        triggerQueryOnInit={!searchBase.getComponent('store-filter')}
        destroyOnUnmount={false}
        render={({ aggregationData, loading, value, setValue }) => {
          return (
            <View style={styles.flex1}>
              {loading ? (
                <ActivityIndicator
                  style={styles.loader}
                  size="large"
                  color="#000"
                />
              ) : (
                <View style={styles.flex1}>
                  <Text style={styles.filterLabel}>Select Stores</Text>
                  <FlatList
                    data={aggregationData.data}
                    keyExtractor={item => item._key}
                    ItemSeparatorComponent={renderItemSeparator}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          padding: 10,
                          alignItems: 'center'
                        }}
                      >
                        <CheckBox
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 10
                          }}
                          value={value ? value.includes(item._key) : false}
                          onValueChange={newValue => {
                            const values = value || [];
                            if (values && values.includes(item._key)) {
                              values.splice(values.indexOf(item._key), 1);
                            } else {
                              values.push(item._key);
                            }
                            // Set filter value and trigger custom query
                            setValue(values, {
                              triggerDefaultQuery: false,
                              stateChanges: true
                            });
                          }}
                        />
                        <Text>
                          {item._key} ({item._doc_count})
                        </Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Filters;