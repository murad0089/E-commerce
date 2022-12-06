import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import getdate from '../../assets/utility/Date';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import Stars from './Stars';

const ReviewItem = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={{marginRight: px(15)}}>
        <FastImage style={styles.image} source={{uri: data?.profileImage}} />
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: px(7),
          }}>
          <Text style={styles.name}>{data?.username}</Text>
          <Text style={styles.date}>{getdate(data?.created)}</Text>
        </View>
        <View style={{marginBottom: px(9)}}>
          <Stars key={Math.random()} filled={data?.starCount} />
        </View>
        <View>
          <Text style={styles.description}>{data?.review}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: px(20),
    flexDirection: 'row',
  },
  image: {
    width: px(40),
    height: px(40),
    borderRadius: 100,
  },
  name: {
    fontFamily: 'DMSans-Medium',
    color: colors.fontColor,
    fontSize: px(14),
  },
  date: {
    color: colors.darkgray,
    fontFamily: 'DMSans-Regular',
  },
  description: {
    color: colors.fontColor,
  },
});

export default ReviewItem;
