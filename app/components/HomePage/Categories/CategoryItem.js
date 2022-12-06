import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import px from '../../../assets/utility/dimension';
import colors from '../../../config/colors';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const CategoryItem = ({image, id, title, color}) => {
  const navigation = useNavigation();
  // useEffect(() => {
  // })
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.containerPressable}
        onPress={() => {
          navigation.navigate('categoryproducts', {id: id, title: title});
        }}>
        <View style={[styles.backgroundContainer, {backgroundColor: color}]}>
          <FastImage style={styles.image} source={{uri: image}} />
        </View>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    // width: px(60),
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: px(24),
    height: px(24),
    marginHorizontal:"25%"
  },
  backgroundContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    width: px(48),
    height: px(48),
  },
  text: {
    fontFamily: 'DMSans-regular',
    color: colors.fontColor,
    marginVertical: 8,
    fontSize: px(14),
  },
});
