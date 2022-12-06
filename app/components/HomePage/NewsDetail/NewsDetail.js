import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import px from '../../../assets/utility/dimension';
import getdate from '../../../assets/utility/Date';
import colors from '../../../config/colors';
import Button from '../../UI/Button';
import axios from 'axios';
import base from '../../../helpers/base';
import AddedButton from '../../UI/AddedButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LatestNewsListItem from '../LatestNews/LatestNewsListItem';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';

const NewsDetail = ({route, navigation}) => {
  const scrollref = useRef();
  const index = route.params.index;
  let randomindex = Math.floor(Math.random() * 3);
  if (index == randomindex) {
    randomindex = Math.floor(Math.random() * 3);
  }
  const [loading, setLoading] = useState(false);
  const [otherData, setOtherData] = useState([]);
  const [otherDatalength, setOtherDataLength] = useState(0);
  async function otherNewsRequest() {
    try {
      const response = await axios.get(
        `https://izzi-ecom.herokuapp.com/news/${randomindex}`,
      );
      setOtherData(response?.data?.data);
      setOtherDataLength(response?.data?.data?.length);
    } catch (error) {
      otherNewsRequest();
    }
  }

  useEffect(() => {
    otherNewsRequest();
  }, [index]);
  const data = route.params.data;
  const OtherNews = () => {
    scrollref.current.scrollTo({
      x: 0,
      y: 0,
    });

    let random1 = Math.floor(Math.random() * otherDatalength);
    let random2 = Math.floor(Math.random() * otherDatalength);

    while (random1 === random2) {
      random2 = Math.floor(Math.random() * otherDatalength);
    }
    return (
      <>
        <LatestNewsListItem
          key={otherData[random1]._id || 'test'}
          data={otherData[random1] || []}
          index={random1}
        />
        <LatestNewsListItem
          key={otherData[random2]._id || 'test1'}
          data={otherData[random2] || []}
          index={random2}
        />
      </>
    );
  };
  const fun = async () => {
    setLoading(true);
    try {
      const shareResponse = await Share.open({
        title: 'Salam',
        message: `${data.image}\n\n*${data.title}*\n\n${data.content}\n`,
        failOnCancel: true,
      });
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };
  const navigator = useNavigation();
  useEffect(() => {
    navigator.setOptions({
      headerRight: () => {
        return (
          <View>
            <AddedButton onPress={fun}>
              <Ionicons
                name="md-arrow-redo-outline"
                size={px(16)}
                color={colors.black}
              />
            </AddedButton>
          </View>
        );
      },
    });
  }, [data]);

  return (
    <>
      {loading ? (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <></>
      )}
      <ScrollView ref={scrollref} style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: data.image}} />
          </View>
          <View>
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{getdate(data.date)}</Text>
          </View>
          <View>
            <Text style={styles.description}>{data.content}</Text>
          </View>
        </View>
        <View>
          <View style={styles.OtherNewsContainer}>
            <Text style={styles.title}>Other News</Text>
          </View>
          <View style={styles.otherNews}>
            {otherDatalength ? <OtherNews /> : <></>}
          </View>
          <View style={styles.container}>
            <Button
              onPress={() => {
                navigation.navigate('allnews');
              }}
              color={colors.black}
              borderColor={colors.black}>
              See all News
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: px(30),
  },
  OtherNewsContainer: {
    marginTop: px(30),
    marginBottom: px(25),
  },
  scrollViewContainer: {
    paddingHorizontal: px(25),
    backgroundColor: colors.white,
  },
  imageContainer: {
    margin: px(25),
    alignItems: 'center',
  },
  image: {
    width: px(325),
    height: px(200),
    borderRadius: px(10),
  },
  title: {
    color: 'black',
    fontFamily: 'DMSans-Regular',
    fontSize: px(20),
  },
  ActivityIndicator: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    width: base.screenWidth,
    height: base.screenHeight,
    justifyContent: 'center',
    backgroundColor: colors.offGray,
    opacity: 0.5,
  },
  otherNews: {},
  dateContainer: {
    marginTop: px(10),
    marginBottom: px(30),
  },
  date: {
    color: colors.darkgray,
  },
  description: {
    color: colors.black,
    fontFamily: 'DMSans-Regular',
    fontSize: px(14),
  },
  descriptionContainer: {},
});
