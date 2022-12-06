import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import px from '../../../assets/utility/dimension';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../config/colors';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const LatestNewsListItem = ({data, index, onPress}) => {
  const navigation = useNavigation();

  return (
    <View style={{overflow: 'hidden'}}>
      <Pressable
        style={styles.container}
        android_ripple={{color: colors.softGray}}
        onPress={
          onPress
            ? onPress
            : () => {
                navigation.navigate('newsdetail', {data: data, index: index});
              }
        }>
        <View style={styles.textView}>
          <Text style={[styles.text, {marginTop: 20}]}>
            {data != null ? data.title : ''}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {data != null ? data.content : ''}
          </Text>
          <Text style={[styles.text, {marginBottom: 20}]}>
            {data != null ? `${new Date(data.date).toDateString()}` : ''}
          </Text>
        </View>
        <View>
          
          <FastImage
            style={styles.image}
            source={
              data != null
                ? {uri: data.image}
                : require('../../../assets/images/480-4800827_little-penguin-simple-cute-penguin-cartoon.png')
            }
          />
        </View>
      </Pressable>
    </View>
  );
};

export default LatestNewsListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EDEDED',
  },
  textView: {width: px(225), marginRight: px(20)},
  text: {
    marginBottom: 10,
    color: '#0C1A30',
  },

  image: {
    height: px(80),
    width: px(80),
    borderRadius: 10,
  },
});
