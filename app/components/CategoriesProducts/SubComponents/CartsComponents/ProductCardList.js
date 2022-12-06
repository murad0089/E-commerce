import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductCard from '../../../ProductCard/ProductCard';
import px from '../../../../assets/utility/dimension';
import colors from '../../../../config/colors';
import base from '../../../../helpers/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCardList = ({products}) => {
  const [wishes, setWishes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getWishes() {
    setLoaded(false);
    const userId = await AsyncStorage.getItem('_id');
    if (userId) {
      try {
        const response = await base.api().get(`wishlists/${userId}`);
        const datas = response.data.data;
        await AsyncStorage.setItem('wishlist', JSON.stringify(datas.products));
        setWishes(datas.products);
        setLoaded(true);
      } catch (error) {}
    } else {
      setWishes(JSON.parse(await AsyncStorage.getItem('wishlist')));
    }

    setLoaded(true);
  }
  useEffect(() => {
    getWishes();
  }, []);

  return (
    <>
      {loaded ? (
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            content
            data={products}
            renderItem={({item}) => (
              <View style={styles.list}>
                <ProductCard wishlistes={wishes} key={item._id} data={item} />
              </View>
            )}
            numColumns={2}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductCardList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: px(10),
    backgroundColor: colors.white,
  },
  list: {
    marginHorizontal: px(10),
    marginVertical: px(15),
  },
});
