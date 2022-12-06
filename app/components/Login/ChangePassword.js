import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import base from '../../helpers/base';
import {ErrorRegister, successChangePassword} from '../../stack/Stack';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';

const ChangePassword = ({navigation}) => {
  const [inputs, setInputs] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });
  const [button, setButton] = useState(false);
  const [iconName, setIconName] = useState('eye-outline');
  const [passwordType, setPasswordType] = useState(true);
  const [error, setError] = useState();
  function getInputs(inputName, data) {
    setInputs({
      ...inputs,
      [inputName]: data,
    });
    setError('')
  }
  function changePasswordVisibility() {
    if (iconName === 'eye-outline') {
      setIconName('eye-off-outline');
    } else {
      setIconName('eye-outline');
    }
    setPasswordType(!passwordType);
  }
  useEffect(() => {
    if (
      inputs.confirmpassword === inputs.newpassword &&
      inputs.confirmpassword.length >= 6
    ) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [inputs]);

  async function postRequest() {
    const userId = await AsyncStorage.getItem('_id');
    try {
      const response = await base.api().patch('user/u', {
        oldPassword: inputs.oldpassword,
        password: inputs.newpassword,
        passwordAgain: inputs.confirmpassword,
        userId,
      });
      successChangePassword();
      navigation.navigate('HomePage');
    } catch (error) {
      console.log(error);
      ErrorRegister();
      setError(true)
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{justifyContent: 'space-between', flex: 1}}
      enableOnAndroid={true}
      style={styles.container}>
      <View>
        <View>
          <Text style={styles.HeadText}>Change Password</Text>
        </View>
        <View style={styles.MainContainer}>
          <View>
            <Text style={styles.RegularText}>Old Password</Text>
            <TextInput
              autoComplete="off"
              autoCapitalize="none"
              placeholderTextColor={colors.darkgray}
              placeholder="Enter your password"
              secureTextEntry={true}
              style={[styles.InputContainer,{borderColor:error?colors.errorRed:colors.blue,}]}
              onChangeText={getInputs.bind(this, 'oldpassword')}></TextInput>
          </View>
          <View>
            <Text style={styles.RegularText}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoComplete="off"
                autoCapitalize="none"
                placeholderTextColor={colors.darkgray}
                placeholder="Enter new password"
                secureTextEntry={passwordType}
                style={[styles.InputContainer,{borderColor:error?colors.errorRed:colors.blue,}]}
                onChangeText={getInputs.bind(this, 'newpassword')}
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
          <View>
            <Text style={styles.RegularText}>Confirm New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                autoComplete="off"
                autoCapitalize="none"
                placeholderTextColor={colors.darkgray}
                placeholder="Confirm your password"
                secureTextEntry={passwordType}
                style={[styles.InputContainer,{borderColor:error?colors.errorRed:colors.blue,}]}
                onChangeText={getInputs.bind(this, 'confirmpassword')}
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
          <Text style={{color: colors.darkgray, marginTop: px(20)}}>
            Password length must be more than 6 symbols
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: px(20),
          borderRadius: px(20),
          height: px(50),
        }}>
        <Button
          onPress={button ? postRequest : () => {}}
          backgroundColor={button ? colors.blue : colors.darkgray}
          color={colors.white}>
          Confirm
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: px(25),
    paddingBottom: px(40),
  },
  MainContainer: {
    paddingHorizontal: px(15),
  },
  HeadText: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Bold',
    fontSize: px(24),
    marginTop: px(20),
    marginBottom: px(60),
  },
  RegularText: {
    color: colors.fontColor,
    fontFamily: 'DMSans-Medium',
    fontSize: px(16),
    marginTop: px(20),
  },
  InputContainer: {
    width: '100%',
    borderRadius: 30,
    marginVertical: px(10),
    borderWidth: px(1),
    color: colors.fontColor,
    paddingHorizontal: px(25),
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeStyle: {
    position: 'absolute',
    right: 0,
  },
});

export default ChangePassword;
