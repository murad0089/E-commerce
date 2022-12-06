import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import px from '../../assets/utility/dimension';
import axios from 'axios';
import colors from '../../config/colors';
import base from '../../helpers/base';
import {ErrorLogin, successLogin} from '../../stack/Stack';
const Login = ({navigation}) => {
  const [keyboard, setkeyboard] = useState();
  const [iconName, setIconName] = useState('eye-outline');
  const [buttonColor, setButtonColor] = useState(colors.disabledButton);
  const [buttonHandler, setButtonHandler] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState(true);
  useEffect(() => {
    if (
      inputs.email != '' &&
      inputs.password != '' &&
      inputs.email.includes('@', 0)
    ) {
      setButtonColor(colors.blue);
      setButtonHandler(true);
    } else {
      setButtonColor(colors.darkgray);
      setButtonHandler(false);
    }
  }, [inputs]);
  function forgotPassword() {
    navigation.navigate('resetpassword');
  }
  function SignUp() {
    navigation.navigate('Register');
  }
  function changePasswordVisibility() {
    if (iconName == 'eye-outline') {
      setIconName('eye-off-outline');
    } else {
      setIconName('eye-outline');
    }
    setPasswordType(!passwordType);
  }
  function getInputs(inputName, data) {
    setInputs({
      ...inputs,
      [inputName]: data,
    });
  }
  async function postRequest() {
    Keyboard.dismiss();
    setLoading(true);
    try {
      setError(false);
      let response = await axios.post(
        'https://izzi-ecom.herokuapp.com/user/login',
        {
          email: inputs.email,
          password: inputs.password,
        },
      );
      const data = await response.data;
      await AsyncStorage.setItem('email', data.email);
      await AsyncStorage.setItem('username', data.username);
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('_id', data._id);
      await AsyncStorage.setItem(
        'profilePicture',
        response.data.profilePicture,
      );
      base.token = data.token;
      // send wishlist
      let wishStoreIds;
      let wishlist = await AsyncStorage.getItem('wishlist');
      if (wishlist) {
        wishlist = JSON.parse(wishlist);
        wishStoreIds = wishlist.map(item => item._id);
      } else wishStoreIds = [];

      await base.api().post('wishlists/send', {
        userId: data._id,
        wishlist: wishStoreIds,
      });
      //

      // send cards
      let cardStoreIds;
      let card = await AsyncStorage.getItem('card');
      if (card) {
        card = JSON.parse(card);
        cardStoreIds = card.map(item => item._id);
      } else cardStoreIds = [];

      await base.api().post('cards/send', {
        userId: data._id,
        products: cardStoreIds,
      });

      //

      Home();
    } catch (error) {
      ErrorLogin();
      setLoading(false);
      setError(true);
    }
    function Home() {
      successLogin();
      navigation.navigate('HomePage');
    }
  }
  useEffect(() => {
    const keyboardListener = Keyboard.addListener(
      'keyboardDidChangeFrame',
      value => {
        setkeyboard(value.endCoordinates.height);
      },
    );

    return () => keyboardListener.remove();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
      ) : (
        <></>
      )}
      <KeyboardAwareScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={keyboard > 0 ? {flexGrow: 0} : {flexGrow: 1}}
        enableOnAndroid={true}
        overScrollMode={'never'}
        keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View style={styles.headerStyle}>
            <View>
              <Text style={styles.welcomeText}>Welcome back to Mega Mall</Text>
              <Text style={styles.descriptionText}>
                Please enter data to login
              </Text>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.emailContainer}>
                <Text style={styles.inputText}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  style={[
                    styles.inputContainer,
                    error && {borderWidth: 1, borderColor: colors.errorRed},
                  ]}
                  placeholderTextColor={colors.darkgray}
                  placeholder="Enter your email address/ phone number"
                  onChangeText={getInputs.bind(this, 'email')}
                />
              </View>
              <View>
                <Text style={styles.inputText}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    style={[
                      styles.inputContainer,
                      {flex: 1},
                      error && {borderWidth: 1, borderColor: colors.errorRed},
                    ]}
                    placeholderTextColor={colors.darkgray}
                    placeholder="Enter your password"
                    onChangeText={getInputs.bind(this, 'password')}
                    secureTextEntry={passwordType}
                  />
                  <View style={styles.eyeStyle}>
                    <IconButton
                      size={24}
                      color={colors.darkgray}
                      onPress={changePasswordVisibility}
                      name={iconName}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.wrongEmail}>
              {error && (
                <Text style={styles.errorText}>
                  Email or password is incorrect
                </Text>
              )}
            </View>
            <View style={styles.signin}>
              <Button
                color={'white'}
                onPress={buttonHandler ? postRequest : () => {}}
                backgroundColor={buttonColor}>
                Sign In
              </Button>
            </View>
          </View>
          <View style={[styles.forgotPassword]}>
            <Button color={'black'} onPress={forgotPassword}>
              Forgot Password
            </Button>
            <Button onPress={SignUp} color={colors.blue}>
              Sign Up
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
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
  errorText: {
    color: colors.errorRed,
  },
  headerStyle: {
    marginTop: px(20),
  },
  emailContainer: {
    marginBottom: px(30),
  },
  wrongEmail: {
    marginTop: px(20),
  },
  eyeStyle: {
    position: 'absolute',
    right: 0,
  },
  mainContainer: {
    marginTop: px(50),
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: px(25),
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  welcomeText: {
    fontSize: px(25),
    color: colors.fontColor,
    marginBottom: px(20),
    fontFamily: 'DMSans-Bold',
  },
  descriptionText: {
    color: colors.darkgray,
    fontSize: px(24),
    fontWeight: '400',
    fontFamily: 'DMSans-Regular',
  },
  inputContainer: {
    color: colors.fontColor,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingVertical: px(16),
    paddingHorizontal: px(20),
  },
  inputText: {
    color: colors.fontColor,
    fontSize: px(14),
    marginBottom: px(20),
    fontFamily: 'DMSans-Regular',
  },
  forgotPassword: {
    height: px(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  signin: {
    height: px(50),
    marginTop: px(70),
  },
});

export default Login;
