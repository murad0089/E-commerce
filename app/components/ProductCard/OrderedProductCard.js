import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import colors from '../../config/colors';
import px from '../../assets/utility/dimension';
import IconButton from '../UI/IconButton';
import base from '../../helpers/base';
import {RemoveFromCartMessage} from '../../stack/Stack';
import FastImage from 'react-native-fast-image';

const OrderedProductCard = ({data, userId, dataResetter}) => {
  const [sale] = useState(data.product.isSale);
  return (
    <View style={{}}>
      <View
        style={{
          marginHorizontal: px(15),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          style={styles.image}
          source={{uri: data.product.coverPhoto}}
        />
        <View style={{width: px(200), paddingLeft: px(10)}}>
          <Text style={{color: colors.black}}>{data.product.name}</Text>
          {sale ? (
            <View>
              <Text style={[styles.price, {color: colors.fontColor}]}>
                $ {data.product.salePrice} X {data.count}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={[styles.price, {color: colors.fontColor}]}>
                $ {data.product.price} X {data.count}
              </Text>
            </View>
          )}
          <View>
            <Text style={[styles.price, {color: colors.fontColor}]}>
              Total Amount: $
              {sale
                ? (
                    data.product.salePrice.replace(/\s/g, '') * data.count
                  ).toFixed(2)
                : data.product.price.replace(/\s/g, '') * data.count.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{height: '100%'}}>
          <IconButton
            name="close"
            color={colors.darkgray}
            style={{}}
            size={px(27)}
            onPress={async () => {
              console.log(data._id);
              console.log(data.product._id);

              const response = await base.api().delete('cards/delete', {
                data: {
                  userId: userId,
                  productId: data.product._id,
                },
              });
              RemoveFromCartMessage();
              dataResetter();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: px(115),
    width: px(115),
    marginTop: px(15),
  },
});

export default OrderedProductCard;
