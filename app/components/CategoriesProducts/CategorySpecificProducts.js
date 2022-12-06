import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ProductCardList from './SubComponents/CartsComponents/ProductCardList';
import {
  fetchProducts,
  setCategorySpecificProductsDispatch,
  setFilteredProducts,
  setProductsForDisplay,
} from '../../store/slices/products';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from '../UI/SearchBar';
import px from '../../assets/utility/dimension';
import Button from '../UI/Button';
import colors from '../../config/colors';
const CategorySpecificProducts = ({route, navigation}) => {
  const dispatch = useDispatch();

  const productsAllData = useSelector(state => state.products);

  useEffect(() => {
    if (productsAllData.allproductsloaded == false) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    if (productsAllData.allproductsloaded == true && route.params.id != '') {
      pickCategorySpecificProducts();
    } else {
      dispatch(
        setCategorySpecificProductsDispatch({
          products: productsAllData.products,
        }),
      );
    }
  }, [productsAllData.products]);

  useEffect(() => {
    dispatch(
      setFilteredProducts({
        filteredProducts: productsAllData.categorySpecificProducts,
      }),
    );
  }, [productsAllData.categorySpecificProducts]);

  useEffect(() => {
    dispatch(
      setProductsForDisplay({
        final: productsAllData.filteredProducts,
      }),
    );
  }, [productsAllData.filteredProducts]);

  const pickCategorySpecificProducts = async () => {
    if (productsAllData.allproductsloaded) {
      if (productsAllData.products.length !== 0) {
        const filteredData = productsAllData.products.filter(
          item => item.category === route.params.id,
        );

        dispatch(setCategorySpecificProductsDispatch({products: filteredData}));
      }
    }
  };

  // useEffect(() => {
  //   if (productsAllData.productsForDisplay.length !== 0) {
  //     Sorting(productsAllData.productsForDisplay, 'A-Z', 'price-L-H');
  //   }
  // }, [productsAllData.productsForDisplay]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAndTitleContainer}>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 32,
            color: colors.fontColor,
            marginVertical: px(10),
          }}>
          {route.params.title}
        </Text>
        <View style={styles.searchBarContainer}>
          {productsAllData.categorySpecificProducts.length == 0 ? (
            <></>
          ) : (
            <SearchBar
              autoFocus={true}
              data={productsAllData.filteredProducts}
              finalAction={setProductsForDisplay}
            />
          )}
        </View>
      </View>
      <View style={{height: '70%', paddingBottom: px(10)}}>
        <ProductCardList products={productsAllData.productsForDisplay} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.navigate('Filter&Sorting');
          }}
          backgroundColor={colors.white}
          color={colors.fontColor}
          borderColor={colors.black}>
          Filter&Sorting
        </Button>
      </View>
    </View>
  );
};

export default CategorySpecificProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarAndTitleContainer: {
    marginHorizontal: px(10),
    marginVertical: px(10),
  },
  searchBarContainer: {
    height: px(60),
  },
  searchIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    height: px(60),
    marginHorizontal: px(15),
  },
});
