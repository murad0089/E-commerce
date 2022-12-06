import React from 'react';
import {useCallback} from 'react';

import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import base from '../../helpers/base';
import CheckoutComponent from './CheckoutComponent';

const Checkout = ({navigation}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const response = await base.api().get('checkouts/all');
        setData(response.data.products);
      } catch (error) {}
    }
    getData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      let sum = 0;
      data.map(item => {
        if (item.productId.salePrice) {
          sum += parseFloat(item.productId.salePrice) * parseFloat(item.count);
        } else {
          sum += parseFloat(item.productId.price) * parseFloat(item.count);
        }
      });
      setTotal(sum);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        // <></>
        <View>
          <View style={styles.Info}>
            <Text style={styles.allOrders}>All orders ({data.length})</Text>
            <Text style={styles.fontFamily}>Total:${total}</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => {
              return <CheckoutComponent item={item}></CheckoutComponent>;
            }}></FlatList>
        </View>
      ) : (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: px(15),
  },
  Info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontFamily: {
    fontFamily: 'DMSans-Bold',
    color: colors.fontColor,
  },
  ActivityIndicator: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    width: base.screenWidth,
    height: base.screenHeight,
    justifyContent: 'center',
    backgroundColor: colors.offGray,
    opacity: 0.5,
  },
  allOrders: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Bold',
    fontSize: px(20),
    padding: px(10),
  },
});

export default Checkout;
