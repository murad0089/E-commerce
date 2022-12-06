import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import px from '../../../assets/utility/dimension';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from '../../ProductCard/ProductCard';
import {
  fetchProducts,
  setAllProductsDisplay,
} from '../../../store/slices/products';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base from '../../../helpers/base';

const ProductsCarousel = ({inProductDetails, inProductId}) => {
  const Skeleton = () => {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          padding={10}
          shadowOffset={{width: 0, height: 5}}
          shadowColor={'#000'}
          shadowOpacity={0.34}
          shadowRadius={6.27}
          elevation={10}
          flexDirection="column"
          alignItems="center">
          <SkeletonPlaceholder.Item
            width={px(150)}
            height={px(180)}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item marginLeft={0} marginTop={10}>
            <SkeletonPlaceholder.Item width={150} height={20} />
            <SkeletonPlaceholder.Item marginTop={6} width={100} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  const productsAllData = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [wishes, setWishes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function getWishes() {
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
    if (productsAllData.allproductsloaded == false) {
      dispatch(fetchProducts());
    }
  }, []);
  useEffect(() => {
    getWishes();

    if (productsAllData.allproductsloaded == true) {
      if (inProductDetails == false || inProductDetails == null) {
        dispatch(setAllProductsDisplay({final: productsAllData.products}));
      } else {
        const tempdata = productsAllData.products.filter(item => {
          return item._id != inProductId;
        });

        dispatch(setAllProductsDisplay({final: tempdata}));
      }
    }
  }, [productsAllData.allproductsloaded, loaded, inProductId]);

  return (
    <>
      {productsAllData.allproductsloaded && loaded ? (
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={{
            paddingVertical: px(10),
          }}
          keyExtractor={item => item._id}
          data={productsAllData.allProductsDisplay}
          renderItem={({item}) => (
            <View style={{marginHorizontal: px(15)}}>
              <ProductCard wishlistes={wishes} data={item} />
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {Array(10)
            .fill(null)
            .map((_, index) => {
              return <Skeleton key={`index ${index}`} />;
            })}
        </ScrollView>
      )}
    </>
  );
};

export default ProductsCarousel;

const styles = StyleSheet.create({
  scrollView: {
    // height: px(200),

    marginTop: px(12),
    marginBottom: px(5),
  },
});
