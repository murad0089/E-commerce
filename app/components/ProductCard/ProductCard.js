import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Addedwish, DeletedWish} from '../../stack/Stack';
import base from '../../helpers/base';
import FastImage from 'react-native-fast-image';

const ProductCard = ({data, wishlistes, inWish}) => {
  const navigation = useNavigation();
  const [starReview, setStarReview] = useState(0);
  const [sale] = useState(data.isSale);
  const [favorite, setFavorite] = useState(false);

  async function checkWishlist() {
    if (wishlistes) {
      wishlistes.forEach(item => {
        if (item._id === data._id) {
          setFavorite(true);
        }
      });
    }
  }

  useEffect(() => {
    if (inWish) {
      setFavorite(true);
    }
    checkWishlist();
  }, []);

  async function setWish() {
    let wishes = JSON.parse(await AsyncStorage.getItem('wishlist'));
    if (!wishes) {
      wishes = [];
    }
    if (
      !wishes.some(item => {
        if (item._id === data._id) {
          return true;
        }
      })
    ) {
      wishes.push(data);
      setFavorite(true);
    }
    await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));

    try {
      const userId = await AsyncStorage.getItem('_id');
      if (userId) {
        await base.api().post('wishlists/create', {
          userId,
          productId: data._id,
        });
      }
    } catch (error) {
      console.log({error});
    }
    Addedwish();
    try {
      setFavorite(true);
    } catch (error) {}
  }
  async function delWish() {
    let wishes = JSON.parse(await AsyncStorage.getItem('wishlist'));

    wishes = wishes.filter(item => {
      return item._id !== data._id;
    });
    await AsyncStorage.setItem('wishlist', JSON.stringify(wishes));
    const userId = await AsyncStorage.getItem('_id');
    try {
      if (userId) {
        await base.api().delete('wishlists/delete', {
          data: {
            userId,
            productId: data._id,
          },
        });
      }
    } catch (error) {}

    setFavorite(false);

    DeletedWish();
    try {
      setFavorite(false);
    } catch (error) {}
  }

  useEffect(() => {
    reviewCounter();
  }, []);

  const reviewCounter = () => {
    let count = 0;
    //   console.log(data.reviews[0].starCount);
    // for (let i = 0; i < data.reviews; i++){
    //  count=count+ data.reviews[i].starCount
    // }
    if (data.reviews.length !== 0) {
      data.reviews.forEach(item => {
        count += item.starCount;
      });
      if (count !== 0) {
        setStarReview(count / data.reviews.length);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetail', {id: data._id});
        }}>
        <View>
          {sale ? (
            <ImageBackground
              style={{
                width: px(40),
                height: px(20),
                position: 'absolute',
                bottom: 0,
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              source={require('../../assets/images/sale.png')}>
              <Text
                style={{
                  fontSize: px(10),
                  color: colors.white,
                  fontFamily: 'DMSans-Bold',
                }}>
                SALE
              </Text>
            </ImageBackground>
          ) : (
            <></>
          )}
          <FastImage
            resizeMode={'contain'}
            style={styles.image}
            source={{uri: data.coverPhoto}}
          />
          <Pressable
            onPress={() => {
              setTimeout(() => {
                if (favorite) {
                  delWish();
                } else {
                  setWish();
                }
              }, 1000);
            }}
            style={{position: 'absolute', right: 10, top: 10, zIndex: 1}}>
            <Ionicons
              name={favorite ? 'md-heart-sharp' : 'md-heart-outline'}
              size={px(24)}
              color={favorite ? colors.errorRed : colors.black}
            />
          </Pressable>
        </View>
        <View style={{marginBottom: px(15), marginTop: px(25)}}>
          <View style={{marginBottom: px(4)}}>
            <Text numberOfLines={1} style={styles.title}>
              {data.name}
            </Text>
          </View>
          <View style={{marginBottom: px(10)}}>
            {sale ? (
              <View>
                <Text style={styles.price}>$ {data.salePrice}</Text>
                <Text
                  style={[
                    styles.price,
                    {
                      color: colors.disabledButton,
                      fontSize: px(10),
                      textDecorationLine: 'line-through',
                      marginTop: 5,
                    },
                  ]}>
                  $ {data.price}
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.price}>$ {data.price}</Text>
                <Text
                  style={[
                    styles.price,
                    {
                      color: colors.disabledButton,
                      fontSize: px(10),
                      textDecorationLine: 'line-through',
                      marginTop: 5,
                      opacity: 0,
                    },
                  ]}>
                  {data.price}
                </Text>
              </>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage
                style={styles.star}
                source={require('../../assets/data/ProductCartDummy/Vector.jpg')}
              />
              <Text style={styles.text}>
                {Number.isInteger(starReview)
                  ? starReview
                  : starReview.toFixed(1)}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>{data.reviews.length} Reviews</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: px(10),
    width: px(156),
    borderRadius: px(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    height: px(115),
    width: px(115),
    marginTop: px(15),
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'DMSans-Medium',
    color: colors.black,
    fontSize: px(14),
  },
  price: {
    fontFamily: 'DMSans-Bold',
    color: colors.errorRed,
    fontSize: px(12),
  },
  star: {
    width: px(12),
    height: px(12),
  },
  text: {
    color: colors.black,
    fontSize: px(10),
  },
});

export default ProductCard;
