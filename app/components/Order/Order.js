import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import colors from '../../config/colors';
import Button from '../UI/Button';
import base from '../../helpers/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import px from '../../assets/utility/dimension';
import OrderedProductCard from '../ProductCard/OrderedProductCard';
import { useEffect } from 'react';

const Order = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  const [logged, setLogged] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchUserId();
      fetchEmail();
    }, []),
  );

  const fetchUserId = async () => {
    const userIdFetch = await AsyncStorage.getItem('_id');
    if (userIdFetch) {
      setLogged(true);
    } else {
      setLogged(false);
    }
    setUserId(userIdFetch);
  };

  const fetchEmail = async () => {
    const emailFetch = await AsyncStorage.getItem('email');
    setEmail(emailFetch);
  };
  // useEffect(() => {
  //   getData();
  // }, logged);

  // useEffect(() => {
  //   if (logged) {
  //     navigation.setOptions({
  //       headerRight: () => {
  //         return (
  //           <View style={{marginRight: px(10)}}>
  //             <Text
  //               style={{
  //                 color: colors.fontColor,
  //                 fontFamily: 'DMSans-Bold',
  //                 fontSize: px(16),
  //               }}>
  //               Total Amount: {totalPrice.toFixed(2)}$
  //             </Text>
  //           </View>
  //         );
  //       },
  //     });
  //   } else {
  //     navigation.setOptions({
  //       headerRight: () => {
  //         return <></>;
  //       },
  //     });
  //   }
  // }, [totalPrice]);
  const paymentFinished = async () => {
    let checkoutComplete = false;
    if (data.length > 0) {
      checkoutComplete = await sendingCheckout();
    }
    if (checkoutComplete) {
      await deletion();
    }
  };

  const deletion = async () => {
    for (let i = 0; i < data.length; i++) {
      try {
        const response = await base.api().delete('cards/delete', {
          data: {
            userId: userId,
            productId: data[i].product._id,
          },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    // data.forEach(async element => {});
  };
  const sendingCheckout = async () => {
    const productsArr = [];
    data.forEach(element => {
      productsArr.push({
        productId: element.product._id,
        count: element.count,
      });
    });
    try {
      const response = await base.api().post('checkouts/send', {
        userId: userId,
        products: productsArr,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getStoreData = async () => {
    try {
      let card = await AsyncStorage.getItem('card');
      if (card) {
        card = JSON.parse(card);
      }
      setData(card);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('_id');
      if (!userId) {
        return getStoreData();
      }
      const response = await base.api().get(`cards/${userId}`);
      const data = await response.data;
      const products = data.products;
      setData(products);
      if (products.length > 0) {
        setDataFetched(true);
      } else {
        setDataFetched(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  const calculateTotal = () => {
    var total = 0;
    data?.map(product => {
      if (product.product.isSale) {
        // console.log('isSale', product.product.salePrice * product.count);
        total =
          total +
          parseFloat(
            product.product.salePrice.replace(/\s/g, '') * product.count,
          );
      } else {
        // console.log('NoSale', product.product.price);
        total =
          total +
          parseFloat(product.product.price.replace(/\s/g, '') * product.count);
      }
    });

    setTotalPrice(total);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  useEffect(() => {
    calculateTotal();
  }, [data]);

  const Product = useCallback(
    ({ item }) => {
      return (
        <OrderedProductCard
          data={item}
          userId={userId}
          dataResetter={getData}
        />
      );
    },
    [loading],
  );

  const EmptyList = useCallback(() => {
    console.log('logged', logged);
    return logged ? (
      // loading || (
      //   <Text
      //     style={{
      //       marginTop: 20,
      //       fontFamily: 'DMSans-Medium',
      //       alignSelf: 'center',
      //     }}>
      //     Card is empty
      //   </Text>
      // )
      <Text
        style={{
          marginTop: 20,
          fontFamily: 'DMSans-Medium',
          alignSelf: 'center',
          color: colors.fontColor,
        }}>
        Card is empty
      </Text>
    ) : (
      <Text
        style={{
          marginTop: 20,
          fontFamily: 'DMSans-Medium',
          alignSelf: 'center',
          color: colors.fontColor,
        }}>
        You must login first
      </Text>
    );
  }, [loading]);

  const Loading = () => {
    return (
      <View>
        {logged ? (
          <ActivityIndicator
            color={colors.EarthGreen}
            size={'large'}
            style={{ alignSelf: 'center' }}
          />
        ) : (
          <Text style={{ color: colors.fontColor }}>First you must log in</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item._id}
            // contentContainerStyle={{padding: px(20)}}
            // columnWrapperStyle={{
            //   justifyContent: 'space-between',
            //   marginTop: px(20),
            // }}
            showsVerticalScrollIndicator={false}
            renderItem={Product}
            ListEmptyComponent={EmptyList}
          />
        )}
      </View>

      {dataFetched & logged ? (
        <View
          style={{
            backgroundColor: colors.white,
            justifyContent: 'center',
            width: '100%',
            alignItems: 'flex-start',
            marginBottom: px(10),
          }}>
          <Text
            style={{
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
              marginLeft: px(20),
              color: colors.black,
            }}>
            Your total: {totalPrice.toFixed(2)} $
          </Text>
        </View>
      ) : (
        <></>
      )}

      {dataFetched && logged ? (
        <View
          style={{
            backgroundColor: colors.white,
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            marginBottom: px(10),
          }}>
          <View style={{ height: px(50), width: '90%' }}>
            <Button
              backgroundColor={colors.blue}
              onPress={() => {
                console.log(email);
                console.log(userId);

                navigation.navigate('payment', {
                  total: totalPrice,
                  email: email,
                  userId: userId,
                  onCompletion: paymentFinished,
                });
              }}
              color={colors.white}>
              Checkout
            </Button>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Order;
