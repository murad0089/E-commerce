import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Antdesign from 'react-native-vector-icons/AntDesign';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import base from '../../helpers/base';
import {useEffect} from 'react';
import {useState} from 'react';
import getdate from '../../assets/utility/Date';
import ProductCardList from '../CategoriesProducts/SubComponents/CartsComponents/ProductCardList';
import FastImage from 'react-native-fast-image';

const StoreDetails = ({route}) => {
  const store = route.params.data;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  async function getData() {
    setLoading(true);
    try {
      const response = await base.api().get(`/stores/store/${store._id}`);

      setData(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.storeContainer}>
              <View>
                <FastImage
                  style={styles.storePhoto}
                  source={{uri: store.photo}}
                />
              </View>
              <View style={styles.storeDescription}>
                <Text style={styles.storename}>{store.name}</Text>
                <View style={styles.isOfficial}>
                  {store.isOfficial ? (
                    <>
                      <Text style={styles.simpleText}>Official Store</Text>
                      <Octicons
                        style={{marginLeft: px(6)}}
                        name="shield-check"
                        size={px(20)}
                        color={colors.blue}
                      />
                    </>
                  ) : (
                    <>
                      <Text style={styles.simpleText}>Non-official Store</Text>
                      <Octicons
                        style={{marginLeft: px(6)}}
                        name="shield-x"
                        size={px(20)}
                        color={colors.darkgray}
                      />
                    </>
                  )}
                </View>
              </View>
              <View style={styles.isOfficial}>
                <Antdesign
                  style={{marginRight: px(5)}}
                  name="star"
                  size={px(24)}
                  color={colors.OrangeFresh}
                />
                <Text style={styles.storename}>{data?.averageStarCount}</Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <Octicons name="location" size={px(24)} color={colors.black} />
              <Text style={styles.locationText}>{data.location}</Text>
            </View>
            <View style={styles.detailContainer}>
              <View>
                <Text style={styles.detailhead}>Followers</Text>
                <Text style={styles.detailText}>{data.followers}</Text>
              </View>
              <View>
                <Text style={styles.detailhead}>Products</Text>
                <Text style={styles.detailText}>{data.products.length}</Text>
              </View>
              <View>
                <Text style={styles.detailhead}>Joined</Text>
                <Text style={styles.detailText}>{getdate(data.joined)}</Text>
              </View>
            </View>
          </View>
          <View>
            <ProductCardList products={data.products} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: px(10),
  },
  ActivityIndicator: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    width: base.screenWidth,
    height: base.screenHeight,
    justifyContent: 'center',
    backgroundColor: colors.offGray,
    opacity: 0.5,
  },
  mainContainer: {
    paddingHorizontal: px(25),
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: px(10),
  },
  detailhead: {
    fontFamily: 'DMSans-Medium',
    fontSize: px(16),
    color: colors.darkgray,
    marginBottom: px(10),
  },
  detailText: {
    fontFamily: 'DMSans-Regular',
    fontSize: px(16),
    color: colors.fontColor,
  },
  locationText: {
    fontFamily: 'DMSans-Medium',
    fontSize: px(16),
    color: colors.fontColor,
    marginLeft: px(10),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpleText: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Regular',
  },
  storePhoto: {
    width: px(45),
    height: px(45),
    borderRadius: px(1000),
  },
  isOfficial: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storename: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Bold',
    fontSize: px(18),
  },
  storeDescription: {
    flex: 1,
    paddingLeft: px(20),
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: px(30),
  },
});

export default StoreDetails;
