import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Button from '../UI/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import colors from '../../config/colors';
import base from '../../helpers/base';
import px from '../../assets/utility/dimension';

const ResetPassword = ({navigation}) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState('#C4C5C4');
  const [inputs, setInputs] = useState({
    email: '',
  });
  useEffect(() => {
    if ((inputs.email != '', inputs.email.includes('@', 0))) {
      setButtonColor(colors.blue);
    } else {
      setButtonColor(colors.darkgray);
    }
  }, [inputs]);
  async function verification() {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://izzi-ecom.herokuapp.com/user/reset/emailConfirm',
        {
          email: inputs.email,
        },
      );
      setError();
      navigation.navigate('verification', {
        email: inputs.email,
        otp: response.data.code,
        confirmType: 'https://izzi-ecom.herokuapp.com/user/reset/emailConfirm',
        path: 'updatepassword',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError({borderWidth: 1, borderColor: colors.errorRed});
    }
  }
  function getInputs(inputName, data) {
    setInputs({
      ...inputs,
      [inputName]: data,
    });
  }
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
        style={styles.KeyboardAwareScrollView}
        bounces={false}>
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.welcomeText}>Reset Password</Text>
              <Text style={styles.descriptionText}>
                Enter Email / No. Mobile account to reset your password
              </Text>
            </View>
            <View style={styles.emailContainer}>
              <View style={styles.emailInputContainer}>
                <Text style={styles.inputText}>Email/ Phone</Text>
                <TextInput
                  style={[styles.inputContainer, error]}
                  placeholderTextColor={colors.darkgray}
                  placeholder="Enter your email address/ phone number"
                  onChangeText={getInputs.bind(this, 'email')}
                  autoComplete={'off'}
                />
                {error ? (
                  <Text style={styles.errorText}>Please enter valid email</Text>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View style={styles.signin}>
              <Button
                onPress={verification}
                color={'white'}
                backgroundColor={buttonColor}>
                Reset
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const screenheight = Dimensions.get('screen').height;
const deviceHeight = screenheight / 1063;
const styles = StyleSheet.create({
  KeyboardAwareScrollView: {
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
  emailContainer: {
    marginTop: px(50),
  },
  emailInputContainer: {
    marginBottom: px(30),
  },
  container: {
    flex: 1,
    marginHorizontal: px(25),
    justifyContent: 'space-between',
  },
  mainContainer: {
    marginTop: px(150),
  },
  errorText: {
    color: colors.errorRed,
    marginLeft: px(10),
    marginTop: px(10),
    fontSize: px(14),
    fontFamily: 'DMSans-Regular',
  },
  welcomeText: {
    fontSize: deviceHeight * 36,
    fontWeight: '700',
    color: '#0C1A30',
    marginBottom: deviceHeight * 20,
  },
  descriptionText: {
    color: '#838589',
    fontSize: deviceHeight * 18,
    fontWeight: '400',
    marginBottom: deviceHeight * 50,
  },
  inputContainer: {
    color: '#0C1A30',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingVertical: deviceHeight * 16,
    paddingHorizontal: deviceHeight * 20,
  },
  inputText: {
    color: '#0C1A30',
    fontSize: deviceHeight * 14,
    marginBottom: deviceHeight * 20,
  },
  forgotPassword: {
    height: deviceHeight * 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  signin: {
    height: deviceHeight * 60,
    marginTop: deviceHeight * 70,
  },
});

export default ResetPassword;
