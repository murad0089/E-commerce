import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import base from '../../helpers/base';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import Button from '../UI/Button';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const [errMsg, setErrMsg] = useState(false);
  const [alreadyExistsError, setalreadyExistsError] = useState(false);

  const [buttonReady, setButtonReady] = useState(false);

  const emailInputHandler = text => {
    if (
      text.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setErrMsg(false);
      setEmail(text);
      setButtonReady(true);
      setalreadyExistsError(false);
    } else {
      setButtonReady(false);
      setErrMsg(true);
    }
  };

  const navigate = useNavigation();

  const placeholder = 'Enter Email/Phone Number to Register';
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
        <ScrollView>
          <View>
            <Text
              style={{
                marginTop: px(30),
                marginBottom: px(20),
                fontSize: px(32),
                fontWeight: '700',
                color: '#0C1A30',
              }}>
              Register Account
            </Text>
            <Text
              style={{
                color: '#838589',
                fontSize: px(16),
                fontWeight: '400',
              }}>
              Enter Email / No. Phone to register{' '}
            </Text>
          </View>
          <View
            style={{
              marginTop: px(60),
              flex: 1,
            }}>
            <View>
              <Text
                style={{
                  color: '#0C1A30',
                  fontSize: px(20),
                  fontWeight: '400',
                }}>
                Email/Phone
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor="#C4C5C4"
                underlineColorAndroid={'transparent'}
                onChangeText={emailInputHandler}
              />
              {errMsg ? (
                <View style={styles.errorView}>
                  <Ionicons
                    name={'alert-circle-outline'}
                    size={24}
                    color={colors.errorRed}
                  />
                  <Text
                    style={{
                      color: colors.errorRed,
                      fontSize: px(16),
                      fontWeight: '400',
                      marginLeft: 5,
                    }}>
                    Please Enter A Valid Email
                  </Text>
                </View>
              ) : (
                <></>
              )}
              {alreadyExistsError ? (
                <View style={styles.errorView}>
                  <Ionicons
                    name={'alert-circle-outline'}
                    size={24}
                    color={colors.errorRed}
                  />
                  <Text
                    style={{
                      color: colors.errorRed,
                      fontSize: px(16),
                      fontWeight: '400',
                      marginLeft: 5,
                    }}>
                    Email Already Exists
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>

            <View style={{marginTop: px(150)}}>
              <View style={{height: px(50)}}>
                <Button
                  backgroundColor={buttonReady ? '#3669c9' : '#C4C5C4'}
                  color={'white'}
                  onPress={
                    email != ''
                      ? async () => {
                          setLoading(true);
                          try {
                            const value = await axios.post(
                              'https://izzi-ecom.herokuapp.com/user/emailConfirm',
                              {email: email},
                            );

                            navigate.navigate('verification', {
                              path: 'Profile Password',
                              email: email,
                              otp: value.data.code,
                              confirmType:
                                'https://izzi-ecom.herokuapp.com/user/emailConfirm',
                            });
                          } catch (error) {
                            console.log(error);
                            setalreadyExistsError(true);
                            setLoading(false);
                          }
                          setLoading(false);
                        }
                      : () => {}
                  }>
                  Continue
                </Button>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: px(120),
                  paddingBottom: px(20),
                }}>
                <Text style={{marginRight: px(5), color: '#838589'}}>
                  Have an account?
                </Text>
                <Pressable
                  onPress={() => {
                    navigate.goBack();
                  }}>
                  <Text style={{color: '#3669c9'}}> Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: px(25),
    backgroundColor: colors.white,
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
  textInput: {
    paddingVertical: px(16),
    paddingHorizontal: px(20),
    backgroundColor: colors.softGray,
    borderRadius: 10,
    color: colors.fontColor,
    marginTop: px(20),
  },
  errorView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Register;
