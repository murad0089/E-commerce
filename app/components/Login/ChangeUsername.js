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
  successChangeUsername,

} from '../../stack/Stack';
import Button from '../UI/Button';

const ChangeUsername = ({navigation}) => {
  const [inputs, setInputs] = useState({
    username: '',
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
    if (inputs.username.length>=6) {
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
        username:inputs.username
      });
      await AsyncStorage.setItem('username', inputs.username);
      successChangeUsername();
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
          <Text style={styles.HeadText}>Change Username</Text>
        </View>
        <View style={styles.MainContainer}>
          <View>
            <Text style={styles.RegularText}>New Username</Text>
            <TextInput
              autoComplete="off"
              autoCapitalize="none"
              placeholder={'Enter new username'}
              placeholderTextColor={colors.darkgray}
              style={styles.InputContainer}
              onChangeText={getInputs.bind(this, 'username')}></TextInput>
          </View>
          <Text style={{color: colors.darkgray, marginTop: px(20)}}>
            Username length must be more than 6 symbols
          </Text>
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

export default ChangeUsername;
