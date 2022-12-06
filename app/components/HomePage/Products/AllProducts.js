import {View} from 'react-native';
import React from 'react';
import ProductCardList from '../../CategoriesProducts/SubComponents/CartsComponents/ProductCardList';
import {useSelector} from 'react-redux';

const AllProducts = () => {
  const productsAllData = useSelector(state => state.products);

  return (
    <View>
      <ProductCardList products={productsAllData.allProductsDisplay} />
    </View>
  );
};

export default AllProducts;
