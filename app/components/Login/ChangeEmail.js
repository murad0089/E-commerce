import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import base from '../../helpers/base';
import {
  ErrorRegister,
  successChangeEmail,

} from '../../stack/Stack';
import Button from '../UI/Button';

const ChangeEmail = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: '',
  });
  const [button, setButton] = useState(false);
  function getInputs(inputName, data) {
    setInputs({
      ...inputs,
      [inputName]: data,
    });
  }
  console.log(inputs);
  useEffect(() => {
    if (inputs.email.includes('@')) {
      setButton(true);
    } else {
      setButton(false);
    }
  }, [inputs]);

  async function postRequest() {
    const userId = await AsyncStorage.getItem('_id');
    try {
        console.log(userId);
      const response = await base.api().patch('user/update', {
        userId:userId,
        email: inputs.email,
      });
      await AsyncStorage.setItem('email', inputs.email);
      successChangeEmail();
      navigation.navigate('HomePage');
    } catch (error) {
      console.log(error);
      ErrorRegister();
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{justifyContent: 'space-between', flex: 1}}
      enableOnAndroid={true}
      style={styles.container}>
      <View>
        <View>
          <Text style={styles.HeadText}>Change Email</Text>
        </View>
        <View style={styles.MainContainer}>
          <View>
            <Text style={styles.RegularText}>New Email</Text>
            <TextInput
              autoComplete="off"
              autoCapitalize="none"
              style={styles.InputContainer}
              placeholder={'Enter new email'}
              placeholderTextColor={colors.darkgray}
              onChangeText={getInputs.bind(this, 'email')}></TextInput>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: px(20),
          borderRadius: px(20),
          height: px(50),
          marginTop:px(40)
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
    fontFamily: 'DMSans-Regular',
    fontSize: px(16),
    marginTop: px(20),
  },
  InputContainer: {
    borderColor: colors.blue,
    borderWidth: px(1),
    borderRadius: 30,
    marginVertical: px(10),
    color: colors.fontColor,
    paddingHorizontal: px(25),
  },
});

export default ChangeEmail;
