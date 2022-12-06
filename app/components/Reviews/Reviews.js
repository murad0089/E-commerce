import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text} from 'react-native';

import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import Button from '../UI/Button';
import ReviewItem from './ReviewItem';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {useEffect} from 'react';
import {useState} from 'react';

const ReviewItems = ({Dummy}) => {
  const element = [];
  let x
  for (let index = 0; index < 3; index++) {
     x= Math.floor(Math.random() * (Dummy.length))
    element.push(x);
  }
  return (
    <View>
      <ReviewItem data={Dummy[0]} key={0}></ReviewItem>
      {Dummy.length > 1 ? (
        <ReviewItem data={Dummy[1]} key={1}></ReviewItem>
      ) : (
        <></>
      )}
      {Dummy.length > 2 ? (
        <ReviewItem data={Dummy[2]} key={2}></ReviewItem>
      ) : (
        <></>
      )}
    </View>
  );
};

const Reviews = ({data}) => {
  const navigation = useNavigation();
  let Data = data;
  const [averageRating, setAverageRating] = useState();
  let count = 0;
  useEffect(() => {
    if (data) {
      data.map(item => {
        count = count + parseInt(item.starCount);
      });
      setAverageRating(count);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.textColor}>Reviews ({data.length})</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Antdesign
                name="star"
                size={px(14)}
                style={styles.star}
                color={colors.OrangeFresh}></Antdesign>
              <Text style={[styles.textColor, {marginLeft: px(3)}]}>
                {(averageRating / data.length).toFixed(1)}
              </Text>
            </View>
          </View>
          <ReviewItems Dummy={data}></ReviewItems>
          <View style={{height: px(50), marginTop: px(25)}}>
            <Button
              color={colors.fontColor}
              borderColor={colors.black}
              onPress={() => {
                navigation.navigate('ReviewProduct', {data: Data});
              }}>
              See All Reviews
            </Button>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: px(10),
  },
  textColor: {
    color: colors.fontColor,
    fontSize: px(16),
    fontFamily: 'DMSans-Bold',
  },
  star: {
    width: px(14),
    height: px(14),
  },
});

export default memo(Reviews);
