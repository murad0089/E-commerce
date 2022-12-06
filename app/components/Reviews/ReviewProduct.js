import React, {useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import Stars from './Stars';
import * as Progress from 'react-native-progress';
import ReviewItem from './ReviewItem';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ReviewProduct = ({route}) => {
  const Dummy = route.params.data;
  let averageRating = 0;
  let count = 0;
  let countOfReviews = [0, 0, 0, 0, 0];
  Dummy.map(item => {
    countOfReviews[item.starCount - 1] = countOfReviews[item.starCount - 1] + 1;
    count = count + 1;
    averageRating = averageRating + item.starCount;
  });
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Antdesign
              name="star"
              size={px(14)}
              style={styles.star}
              color={colors.OrangeFresh}></Antdesign>
            <Text style={styles.headerRightText}>
              {(averageRating / count).toFixed(1)}
            </Text>
          </View>
        );
      },
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.ReviewsContainer}>
          <View style={styles.averageMainContainer}>
            <View style={styles.averageRatingContainer}>
              <Text style={styles.averageRatingText}>
                {(averageRating / count).toFixed(1)}
              </Text>
              <Text style={styles.averageOverRatingText}>/ 5</Text>
            </View>
            <Text style={styles.countOfReviews}>{count} Reviews</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <Stars key={Math.random()} filled={5}></Stars>
              <Progress.Bar
                borderWidth={0}
                color={colors.OrangeFresh}
                progress={(countOfReviews[4] * 5) / averageRating}
                unfilledColor={colors.softGray}></Progress.Bar>
              <Text style={styles.textColor}>{countOfReviews[4]}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Stars key={Math.random()} filled={4}></Stars>
              <Progress.Bar
                borderWidth={0}
                color={colors.OrangeFresh}
                progress={(countOfReviews[3] * 5) / averageRating}
                unfilledColor={colors.softGray}></Progress.Bar>
              <Text style={styles.textColor}>{countOfReviews[3]}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Stars key={Math.random()} filled={3}></Stars>
              <Progress.Bar
                borderWidth={0}
                color={colors.OrangeFresh}
                progress={(countOfReviews[2] * 5) / averageRating}
                unfilledColor={colors.softGray}></Progress.Bar>
              <Text style={styles.textColor}>{countOfReviews[2]}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Stars key={Math.random()} filled={2}></Stars>
              <Progress.Bar
                borderWidth={0}
                color={colors.OrangeFresh}
                progress={(countOfReviews[1] * 5) / averageRating}
                unfilledColor={colors.softGray}></Progress.Bar>
              <Text style={styles.textColor}>{countOfReviews[1]}</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Stars key={Math.random()} filled={1}></Stars>
              <Progress.Bar
                borderWidth={0}
                color={colors.OrangeFresh}
                progress={(countOfReviews[0] * 5) / averageRating}
                unfilledColor={colors.softGray}></Progress.Bar>
              <Text style={styles.textColor}>{countOfReviews[0]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.FlatListContainer}>
          <FlatList
            data={Dummy}
            key={item => item.id}
            renderItem={({item}) => {
              return <ReviewItem data={item} />;
            }}></FlatList>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerRightText: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Medium',
    fontSize: px(16),
  },
  star: {
    width: px(16),
    height: px(16),
  },
  FlatListContainer: {
    marginTop: px(20),
    paddingHorizontal: px(15),
    marginBottom: px(20),
  },
  progressContainer: {
    paddingLeft: px(10),
  },
  averageMainContainer: {
    paddingTop: 19,
    paddingBottom: px(25),
    paddingRight: px(25),
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.softGray,
  },
  ReviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px(10),
  },
  averageRatingText: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Bold',
    fontSize: px(28),
    lineHeight: px(39.06),
  },
  averageOverRatingText: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Medium',
    fontSize: px(14),
    lineHeight: px(30),
  },
  averageRatingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  countOfReviews: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Medium',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColor: {
    color: colors.fontColor,
  },
});

export default ReviewProduct;
