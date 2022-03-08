import React, { useContext } from 'react';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { View, ActivityIndicator, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 65,
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

const BucketFilterId = 'bucket-filter';
const StoreFilterId = 'store-filter';
const SizeFilterId = 'size-filter';
const GenderFilterId = 'gender-filter';
const PriceFilterId = 'price-filter';
export const AllFilters = [BucketFilterId, StoreFilterId, SizeFilterId, GenderFilterId, PriceFilterId];

const Filters = () => {
  return (
    <ScrollView style={styles.filterContainer}>
      {/* <Filter id={StoreFilterId} dataField="business_name.keyword" title="Store" />
      <Filter id={BucketFilterId} dataField="buckets.keyword" title="Category" />
      <Filter id={GenderFilterId} dataField="gender.keyword" title="Gender" /> */}
      <Filter id={SizeFilterId} dataField="sizes.keyword" title="Size" dynamic maxNumberOfOptions={5} />
      <RangeFilter id={PriceFilterId} interval={1000} dataField="original_price" title="Price" formatValue={(value) => {
        const dollars = Number(value) / 100;
        return `$${(dollars).toFixed(2)}`;
      }} />
    </ScrollView>
  );
};

const Filter = ({ id, dataField, title, dynamic, maxNumberOfOptions }) => {
  const searchBase = useContext(SearchContext);

  const applyFilters = () => {
    AllFilters.forEach(filterId => {
      const filterInstance = searchBase.getComponent(filterId);
      if (filterInstance) {
        filterInstance.setValue([]);
      }
    })
  }

  return <SearchComponent
    id={id}
    type="term"
    dataField={dataField}
    subscribeTo={['aggregationData', 'requestStatus', 'value']}
    URLParams
    aggregationSize={maxNumberOfOptions}
    react={dynamic ? {
      and: ['search-component', ...AllFilters.filter(filterId => filterId !== id)],
    } : undefined}
    customQuery={(searchComponent) => {
      if (!searchComponent.value || searchComponent.value.length === 0) {
        return {};
      }

      return ({
        query: {
          terms: {
            [dataField]: searchComponent.value
          }
        }
      })
    }}
    // To initialize with default value
    value={[]}
    // Avoid fetching query if component has already been initialized
    triggerQueryOnInit={!searchBase.getComponent(id)}
    destroyOnUnmount={false}
    render={renderFilter(title, dynamic, applyFilters)}
  />
}

const renderFilter = (title, dynamic, onValueChecked) => ({ aggregationData, loading, value, setValue }) => {
  // console.log('aggregationData', title, aggregationData);

  if (dynamic && aggregationData.data.length === 0 && !loading) {
    return <View />;
  }

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
          <Text style={styles.filterLabel}>{title}</Text>
          {aggregationData.data.map(item => {
            return <View
              key={item._key}
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
                  if (onValueChecked) {
                    onValueChecked();
                  }
                }}
              />
              <Text>
                {item._key} ({item._doc_count})
              </Text>
            </View>
          })}
        </View>
      )}
    </View>
  );
}

const RangeFilter = ({ id, dataField, title, dynamic, formatValue, interval }) => {
  const searchBase = useContext(SearchContext);

  const applyFilters = () => {
    AllFilters.forEach(filterId => {
      const filterInstance = searchBase.getComponent(filterId);
      if (filterInstance) {
        filterInstance.triggerCustomQuery();
      }
    })
  }

  return <SearchComponent
    id={id}
    type="range"
    dataField={dataField}
    subscribeTo={['aggregationData', 'requestStatus', 'value', 'results']}
    URLParams
    aggregations={['min', 'max', 'histogram']}
    interval={interval}
    react={dynamic ? {
      and: ['search-component', ...AllFilters.filter(filterId => filterId !== id)],
    } : undefined}
    // Avoid fetching query if component has already been initialized
    triggerQueryOnInit={!searchBase.getComponent(id)}
    destroyOnUnmount={false}
    render={renderRangeFilter({ title, dynamic, onChange: applyFilters, formatValue })}
  />
}

const renderRangeFilter = ({ title, dynamic, formatValue }) => ({ results, loading, value, setValue }) => {
  console.log('values', results, value);

  if (!value && !loading && results && results.raw && results.raw.aggregations && results.raw.aggregations.max && results.raw.aggregations.min) {
    setValue({
      start: results.raw.aggregations.min.value,
      end: results.raw.aggregations.max.value,
      minValue: results.raw.aggregations.min.value,
      maxValue: results.raw.aggregations.max.value,
    });
    return <View />;
  }

  if (!value) {
    return <View />;
  }
  // if (dynamic && !loading) {
  //   return <View />;
  // }

  return (
    <View style={styles.flex1}>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="#000"
        />
      ) : (
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>{title}</Text>
          {/* TODO: Custom labels for the markers using formatValue */}
          <MultiSlider
            enableLabel
            min={value.minValue}
            max={value.maxValue}
            values={[value.start, value.end]}
            onValuesChangeFinish={(newValues) => {
              console.log('new values', newValues);

              setValue(
                {
                  ...value,
                  start: newValues[0],
                  end: newValues[1]
                },
                {
                  triggerDefaultQuery: false,
                  triggerCustomQuery: true,
                  stateChanges: true
                }
              );
            }}
          />
        </View>
      )}
    </View>
  );
}

export default Filters;