import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import base from '../../helpers/base';
import colors from '../../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import px from '../../assets/utility/dimension';
const UpdatePassword = ({navigation, route}) => {
  const [iconName, setIconName] = useState('eye-outline');
  const [confirmIconName, setConfirmIconName] = useState('eye-outline');
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState(colors.disabledButton);
  const [inputs, setInputs] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  useEffect(() => {
    if (
      inputs.newpassword.length == inputs.confirmpassword.length &&
      inputs.confirmpassword == inputs.newpassword &&
      inputs.newpassword.length > 6
    ) {
      setButtonColor(colors.blue);
    } else {
      setButtonColor(colors.disabledButton);
    }
  }, [inputs]);
  function changePasswordVisibility() {
    if (iconName == 'eye-outline') {
      setIconName('eye-off-outline');
    } else {
      setIconName('eye-outline');
    }
    setPasswordType(!passwordType);
  }
  function changeConfirmPasswordVisibility() {
    if (confirmIconName == 'eye-outline') {
      setConfirmIconName('eye-off-outline');
    } else {
      setConfirmIconName('eye-outline');
    }
    setConfirmPasswordType(!confirmPasswordType);
  }
  function getInputs(inputName, data) {
    setInputs({
      ...inputs,
      [inputName]: data,
    });
  }
  async function Update() {
    setLoading(true);
    try {
      const response = await axios.patch(
        'https://izzi-ecom.herokuapp.com/user/reset',
        {
          email: route.params.email,
          password: inputs.newpassword,
          rePassword: inputs.confirmpassword,
        },
      );

      await AsyncStorage.setItem('email', response.data.email);
      await AsyncStorage.setItem('username', response.data.username);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('_id', response.data._id);

      Home();
    } catch (error) {
      setLoading(false);
    }
  }
  function Home() {
    navigation.navigate('HomePage');
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        overScrollMode={'never'}
        keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View style={{marginTop: px(100)}}>
            <View>
              <Text style={styles.welcomeText}>Update Password</Text>
              <Text style={styles.descriptionText}>
                Complete the following latest data to enter the Mega Mall
                application
              </Text>
            </View>
            <View style={{marginTop: px(50)}}>
              <View>
                <Text style={styles.inputText}>New Password</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.inputContainer, {flex: 1}]}
                    placeholderTextColor={colors.disabledButton}
                    placeholder="Enter your password"
                    onChangeText={getInputs.bind(this, 'newpassword')}
                    secureTextEntry={passwordType}
                  />
                  <View style={{position: 'absolute', right: 0}}>
                    <IconButton
                      size={24}
                      color={colors.disabledButton}
                      onPress={changePasswordVisibility}
                      name={iconName}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconButton
                    name={'information-circle-outline'}
                    size={18}
                    color={'#999'}></IconButton>
                  <Text style={{color: colors.darkgray}}>
                    Password must be 6 characters or more
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.inputText}>Confirm New Password</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.inputContainer, {flex: 1}]}
                    placeholderTextColor={colors.disabledButton}
                    placeholder="Enter your password"
                    onChangeText={getInputs.bind(this, 'confirmpassword')}
                    secureTextEntry={confirmPasswordType}
                  />
                  <View style={{position: 'absolute', right: 0}}>
                    <IconButton
                      size={24}
                      color={colors.disabledButton}
                      onPress={changeConfirmPasswordVisibility}
                      name={confirmIconName}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.signin}>
            <Button
              onPress={buttonColor == colors.blue ? Update : () => {}}
              color={'white'}
              backgroundColor={buttonColor}>
              Save Update
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: 'space-between',
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
  welcomeText: {
    fontSize: px(24),
    fontWeight: '700',
    color: '#0C1A30',
    marginBottom: px(20),
    marginRight: px(100),
  },
  descriptionText: {
    color: colors.disabledButton,
    fontSize: px(16),
    fontWeight: '400',
  },
  inputContainer: {
    color: colors.fontColor,
    borderRadius: 10,
    backgroundColor: colors.softGray,
    paddingVertical: px(16),
    paddingHorizontal: px(20),
  },
  inputText: {
    color: colors.fontColor,
    fontSize: px(14),
    marginBottom: px(10),
  },
  forgotPassword: {
    height: px(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  signin: {
    height: px(50),
    marginBottom: px(20),
    marginTop: px(30),
  },
});

export default UpdatePassword;
