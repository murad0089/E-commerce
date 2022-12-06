import React from 'react';
import {View, StyleSheet} from 'react-native';
import px from '../../assets/utility/dimension';
import Antdesign from 'react-native-vector-icons/AntDesign';
import colors from '../../config/colors';

const Stars = ({filled}) => {
  const empty = 5 - filled;

  const temparr = [];
  for (let index = 0; index < filled; index++) {
    temparr.push(
      <Antdesign
        key={(index + 1) * Math.random()}
        name="star"
        size={px(14)}
        style={styles.star}
        color={colors.OrangeFresh}></Antdesign>,
    );
  }
  for (let index = 0; index < empty; index++) {
    temparr.push(
      <Antdesign
        key={(index + 1) * Math.random()}
        name="staro"
        size={px(14)}
        style={styles.star}
        color={colors.OrangeFresh}></Antdesign>,
    );
  }

  return <View style={styles.container}>{temparr}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    width: px(14),
    height: px(14),
    marginRight: px(5),
  },
});

export default Stars;
