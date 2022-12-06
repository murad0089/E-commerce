import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import px from '../../assets/utility/dimension';

const AddedButton = ({children, backgroundColor, onPress, borderColor}) => {
  return (
    <Pressable style={{flex: 1}} onPress={onPress}>
      <View
        style={[
          styles.container,
          {backgroundColor: backgroundColor, borderColor: borderColor},
          borderColor && {borderWidth: 1},
        ]}>
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: px(12),
    paddingHorizontal: px(16),
    borderRadius: px(12),
  },
});

export default AddedButton;
