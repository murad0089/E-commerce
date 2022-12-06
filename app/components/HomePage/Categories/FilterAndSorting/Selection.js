import {View, Text, Pressable} from 'react-native';
import React from 'react';
import px from '../../../../assets/utility/dimension';
import colors from '../../../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Selection({title, value, selectedValue, valuesetter}) {
  return (
    <Pressable
      onPress={() => {
        if (value == selectedValue) {
          valuesetter('');
        } else {
          valuesetter(value);
        }
      }}>
      <View
        style={{
          height: px(50),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: px(10),
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: colors.fontColor,
          }}>
          {title}
        </Text>
        {value == selectedValue ? (
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={colors.EarthGreen}
          />
        ) : (
          <Ionicons name="ellipse-outline" size={20} color={'black'} />
        )}
      </View>
    </Pressable>
  );
}
