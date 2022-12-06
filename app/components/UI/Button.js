import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import px from '../../assets/utility/dimension';

const Button = ({children, backgroundColor, color, onPress, borderColor}) => {
  return (
    <Pressable style={{flex: 1}} onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: backgroundColor, borderColor: borderColor},
          borderColor && {borderWidth: 1},
        ]}>
        <Text style={{color: color, textAlign: 'center',alignItems:'center'}}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: px(12),
    paddingHorizontal: px(12),
    borderRadius: px(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
