import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import CategoryItem from './CategoryItem';
import {useSelector} from 'react-redux';
import px from '../../../assets/utility/dimension';
import colors from '../../../config/colors';

const AllCategories = () => {
  const categoriesFromStore = useSelector(state => state.categories);

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        {/*
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <IconButton
            name={'close'}
            size={25}
            color={'black'}
            onPress={() => navigation.goBack()}
          />
           <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 28,
              marginRight: 20,
              color: colors.fontColor
          }}>
          All Categories
        </Text>
        </View> */}
        <View style={styles.allNewsContainer}>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={categoriesFromStore.content}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginHorizontal: px(5),
                    paddingVertical: 15,
                    marginVertical: px(10),
                  }}>
                  <CategoryItem
                    key={item._id}
                    id={item._id}
                    image={item.image}
                    title={item.name}
                    color={item.bgColor}
                  />
                </View>
              );
            }}
            numColumns={4}
          />
          {/* {categoriesFromStore.content.map(item => (
            <CategoryItem
              key={item._id}
              image={item.image}
              title={item.name}
              color={item.bgColor}
            />
          ))} */}
        </View>
      </View>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  parent: {},
  container: {
    backgroundColor: colors.offGray,
  },
  allNewsContainer: {
    marginTop: 10,
  },
  flatlist: {
    justifyContent: 'space-evenly',
    alignItems: 'center',

    // backgroundColor:"red"
  },
});
