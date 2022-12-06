import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import LatestNewsList from './LatestNews/LatestNewsList';
import Button from '../UI/Button';
import px from '../../assets/utility/dimension';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../config/colors';
import CategoryCarousel from './Categories/CategoryCarousel';
import ProductsCarousel from './Products/ProductsCarousel';
import { useSelector } from 'react-redux';
import SearchBar from '../UI/SearchBar';
import { setAllProductsDisplay } from '../../store/slices/products';

const HomePage = ({ navigation }) => {
  const focused = useIsFocused();
  const [load, setLoad] = useState(false);
  const productsAllData = useSelector(state => state.products);
  useEffect(() => {
    if (focused) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [focused]);
  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        <View>
          <View>
            {productsAllData.products.length === 0 ||
              <SearchBar
                navigateOnFocus={true}
                data={productsAllData.products}
                finalAction={setAllProductsDisplay}
              />
            }
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Categories</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('allcategories');
              }}>
              <Text style={{ color: colors.blue }}>See All</Text>
            </Pressable>
          </View>
          <CategoryCarousel />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>All Products</Text>
          <Pressable
            onPress={() => {
              // setCategoriesModal(true);
              navigation.navigate('categoryproducts', {
                id: '',
                title: 'All Products',
              });
            }}>
            <Text style={{ color: colors.blue }}>See All</Text>
          </Pressable>
        </View>
        <View>{load ? <ProductsCarousel /> : <></>}</View>
        <View style={{ paddingVertical: px(30) }}>
          <View>
            <Text style={styles.latestNewsHeaderText}>Latest News</Text>
          </View>
          <ScrollView horizontal={true} style={{ width: '100%' }}>
            <LatestNewsList
              homepage={true}
              amountOfNews={3}
              extraRender={false}
            />
          </ScrollView>

          <View style={{ height: px(60) }}>
            <Button
              backgroundColor={'white'}
              color={'#0C1A30'}
              borderColor={'#0C1A30'}
              onPress={() => {
                navigation.navigate('allnews');
              }}>
              See All News
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: px(20),
  },
  ScrollView: {
    backgroundColor: colors.white,
  },
  latestNewsHeaderText: { fontWeight: '700', fontSize: px(25), color: '#0C1A30' },
  title: {
    fontFamily: 'DMSans-regular',
    color: colors.fontColor,
    marginVertical: 8,
    fontWeight: '700',
    fontSize: px(25),
    color: '#0C1A30',
  },
});
