import {Pressable, Text, View} from 'react-native';
import React from 'react';

const AddToCart = () => {
  return (
    <View>
      <Pressable
        android_ripple={'#fff'}
        onPress={() => {
          navigator.goBack();
        }}
        style={{flex: 1, backgroundColor: 'rgba(101, 96, 96,0.1)'}}
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          paddingHorizontal: px(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            marginTop: px(80),
            paddingTop: px(25),
            paddingHorizontal: px(25),
            paddingBottom: px(10),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            style={{
              color: colors.fontColor,
              fontWeight: '700',
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            }}>
            Filter & Sorting
          </Text>
          <IconButton
            name="close"
            color={colors.darkgray}
            size={27}
            onPress={navigator.goBack}
          />
        </View>
      </View>
    </View>
  );
};

export default AddToCart;
