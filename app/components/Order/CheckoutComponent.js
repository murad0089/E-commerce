import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';

const CheckoutComponent = ({item}) => {
  const [sale, setSale] = useState(item.productId.isSale);
  const navigation = useNavigation();
  
  // console.log(item);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ProductDetail', {id: item.productId._id});
      }}
      style={{
        flex: 1,
        borderBottomColor: colors.softGray,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
         
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          style={styles.image}
          source={{uri: item.productId?.coverPhoto}}
        />
        <View>
          <Text style={[{width: px(220)},styles.fontFamily]}>
            {item.productId?.name}
          </Text>
          {sale ? (
            <View>
              <Text style={styles.fontFamily}>
                $ {item.productId?.salePrice} X {item.count}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.fontFamily}>
                $ {item.productId?.price} X {item.count}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.price}>
              Total Amount: $
              {sale
                ? item.productId?.salePrice.replace(/\s/g, '') * item.count
                : item.productId?.price.replace(/\s/g, '') * item.count}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: px(115),
    width: px(115),
    marginTop: px(10),
  },
  fontFamily:{
    fontFamily:'DMSans-Regular',
    color:colors.fontColor
  },
  price: {
    fontFamily: 'DMSans-Bold',
    color: colors.fontColor,
    fontSize: px(12),
  },
});

export default CheckoutComponent;
