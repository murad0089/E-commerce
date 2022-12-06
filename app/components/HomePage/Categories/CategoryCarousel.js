import {FlatList, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import CategoryItem from './CategoryItem';
import px from '../../../assets/utility/dimension';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setCategoriesArray} from '../../../store/slices/Categories';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CategoryCarousel = () => {
  const categoriesFromStore = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const dataFetcherForCategories = async () => {
    const response = await axios.get(
      'https://izzi-ecom.herokuapp.com/categories/',
    );
    dispatch(setCategoriesArray({categories: response.data}));
  };
  useEffect(() => {
    if (categoriesFromStore.content.length == 0) {
      dataFetcherForCategories();
    }
  }, [categoriesFromStore]);

  const SkeletonCategory = () => {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item marginHorizontal={px(20)}>
          <SkeletonPlaceholder.Item
            height={px(50)}
            width={px(50)}
            borderRadius={10}
          />
          <SkeletonPlaceholder.Item
            height={px(20)}
            marginTop={5}
            borderRadius={5}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };
  return (
    <>
      {categoriesFromStore.categoriesSet ? (
        <FlatList
          style={styles.scrollView}
          data={categoriesFromStore.content}
          renderItem={({item}) => (
            <CategoryItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.name}
              color={item.bgColor}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
          <SkeletonCategory />
        </ScrollView>
      )}
    </>
  );
};

export default CategoryCarousel;

const styles = StyleSheet.create({
  scrollView: {
    height: px(120),
    marginTop: px(12),
    marginBottom: px(5),
  },
});
