import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import base from '../../helpers/base';
import { successLogout } from '../../stack/Stack';
import Button from '../UI/Button';

const Account = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [informations, setInformations] = useState({
    name: '',
    email: '',
    profilePicture: null,
  });
  const focused = useIsFocused()

  async function getNameEmail() {
    let name = await AsyncStorage.getItem('username');
    let email = await AsyncStorage.getItem('email');
    let profilePicture = await AsyncStorage.getItem('profilePicture');

    setInformations({
      name: name,
      email: email,
      profilePicture: profilePicture,
    });
    return informations;
  }
  useEffect(() => {
    setLoading(true);
    getNameEmail();
    setLoading(false);
  }, [focused]);

  async function logOut() {
    setLoading(true);
    await AsyncStorage.clear();
    base.token = '';
    successLogout();
    Home();
  }
  function Home() {
    navigation.navigate('HomePage');
  }

  return (
    <>
      {loading ? (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.container}>
        {/* <View style={styles.AccountContainer}>
          <View style={styles.IconContainer}>
            <Image
              style={{width: px(100), height: px(100), borderRadius:1000}}
              source={{uri: informations.profilePicture}}></Image>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>
              Username:{informations.name.toUpperCase()}
            </Text>
            <Text style={styles.textStyle}>
              Email:{'\n'}
              {informations.email}
            </Text>
          </View>
        </View>
        <View style={styles.ButtonStyle}>
          <Button
            onPress={logOut}
            color={colors.errorRed}
            borderColor={colors.errorRed}>
            <Text style={styles.Logout}>Log Out</Text>
          </Button>
        </View> */}
        <View>
          <View
            style={{
              backgroundColor: colors.blue,
              elevation: 16,
              width: '100%',
              height: px(200),
              borderBottomLeftRadius: px(200),
              borderBottomRightRadius: px(200),
            }}>
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                width: '100%',
                bottom: px(-50),
              }}>
              <Image
                style={{ width: px(100), height: px(100), borderRadius: 1000 }}
                source={{ uri: informations.profilePicture }}
              />
            </View>
          </View>
          <View style={{ marginTop: px(70) }}>
            <Pressable onPress={() => {
              navigation.navigate('ChangeUsername',);
            }} style={styles.InformationComponent}>
              <AntDesign name="user" color={colors.blue} size={px(24)} />
              <Text style={styles.textStyle}>
                {informations.name.toUpperCase()}
              </Text>
            </Pressable>
            <Pressable onPress={() => {
              navigation.navigate('ChangeEmail',);
            }} style={styles.InformationComponent}>
              <AntDesign name="mail" color={colors.blue} size={px(24)} />
              <Text style={styles.textStyle}>{informations.email}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('ChangePassword', {
                  email: informations.email,
                });
              }}
              style={styles.InformationComponent}>
              <AntDesign name="eyeo" color={colors.blue} size={px(24)} />
              <Text style={styles.textStyle}>Change Password</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('MyOrders');
              }}
              style={styles.InformationComponent}>
              <AntDesign name="gift" color={colors.blue} size={px(24)} />
              <Text style={styles.textStyle}>All orders</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.ButtonStyle}>
          <Button
            onPress={logOut}
            color={colors.errorRed}
            borderColor={colors.errorRed}>
            <Text style={styles.Logout}>Log Out</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: px(30),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    // alignItems: 'center',
    flex: 1,
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
  InformationComponent: {
    borderBottomColor: colors.darkgray,
    borderBottomWidth: 1,
    marginTop: px(20),
    marginHorizontal: px(30),
    flexDirection: 'row',
    alignItems: 'center',
    padding: px(10),
  },
  IconContainer: {
    borderRadius: 1000,
    backgroundColor: colors.white,
    elevation: 6,
  },
  AccountContainer: {
    flexDirection: 'row',
  },
  Logout: {
    fontFamily: 'DMSans-Medium',
    fontSize: px(16),
    color: colors.errorRed,
  },
  ButtonStyle: {
    marginBottom: px(20),
    marginHorizontal: px(20),
    height: px(55),
  },
  textStyle: {
    marginLeft: px(40),
    fontFamily: 'DMSans-Regular',
    fontSize: px(16),
    color: colors.fontColor,
  },
  textContainer: {
    padding: px(15),
    justifyContent: 'space-between',
  },
});

export default Account;
