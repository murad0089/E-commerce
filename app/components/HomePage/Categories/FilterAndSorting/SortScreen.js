import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Selection from './Selection';
import px from '../../../../assets/utility/dimension';
import {Sorting} from '../../../../assets/utility/Sorting';
import Button from '../../../UI/Button';
import colors from '../../../../config/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setProductsForDisplay} from '../../../../store/slices/products';

const SortScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const productsAllData = useSelector(state => state.products);

  const [SortType, setSortType] = useState('A-Z');
  const [sortedValue, setSortedValue] = useState([]);

  useEffect(() => {
    if (sortedValue.length) {
      dispatch(setProductsForDisplay({final: sortedValue}));
    }
  }, [JSON.stringify(sortedValue)]);

  return (
    <View style={styles.container}>
      <View style={styles.selectionGroupContainer}>
        <Selection
          title={'Name (A / Z)'}
          value={'A-Z'}
          selectedValue={SortType}
          valuesetter={setSortType}
          alternateValue={'Z-A'}
        />

        <Selection
          title={'Name (Z / A)'}
          value={'Z-A'}
          selectedValue={SortType}
          valuesetter={setSortType}
          alternateValue={'A-Z'}
        />
      </View>

      <View style={styles.selectionGroupContainer}>
        <Selection
          title={'Price (High / Low)'}
          value={'price-H-L'}
          selectedValue={SortType}
          valuesetter={setSortType}
          alternateValue={'price-L-H'}
        />

        <Selection
          title={'Price (Low / High)'}
          value={'price-L-H'}
          selectedValue={SortType}
          valuesetter={setSortType}
          alternateValue={'price-H-L'}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{height: px(50), flex: 1, marginHorizontal: 10}}>
          <Button
            borderColor={'black'}
            color={colors.fontColor}
            onPress={() => {
              setSortType('A-Z');
            }}>
            Reset
          </Button>
        </View>
        <View style={{height: px(50), flex: 1, marginHorizontal: 10}}>
          <Button
            onPress={async () => {
              setSortedValue(
                Sorting(productsAllData.productsForDisplay, SortType),
              );

              navigation.pop(1);
            }}
            borderColor={colors.blue}
            backgroundColor={colors.blue}
            color={'white'}>
            Apply
          </Button>
        </View>
      </View>
    </View>
  );
};

export default SortScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: px(25),
    marginVertical: px(20),
  },
  selectionGroupContainer: {
    marginVertical: px(10),
  },
});
