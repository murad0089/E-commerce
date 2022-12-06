import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IconButton = ({name, size, color, onPress, position}) => {
  return (
    <Pressable style={{position}} onPress={onPress}>
      <View style={styles.container}>
        <Ionicons {...{name, size, color}} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    margin: 8,
    borderRadius: 8,
  },
});

export default IconButton;
