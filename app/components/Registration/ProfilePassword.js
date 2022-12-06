import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import IconButton from '../UI/IconButton';
import Button from '../UI/Button';
import base from '../../helpers/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import {ErrorRegister, successRegister} from '../../stack/Stack';
import {useEffect} from 'react';

const dimension = Dimensions.get('screen').height / 830;

const ProfilePassword = ({navigation, route}) => {
  const [passwordType, setPasswordType] = useState(true);
  const [confirmType, setConfirm] = useState(true);

  const [loading, setLoading] = useState(false);

  const [passwordWarning, setPasswordWarning] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [nameWarning, setNameWarning] = useState(true);

  const [equal, setEqual] = useState(false);

  const [input, setInput] = useState({
    name: '',
    password: '',
    confirm: '',
  });

  const changePasswordVisibility = () => {
    setPasswordType(!passwordType);
  };

  const changeConfirmVisibility = () => {
    setConfirm(!confirmType);
  };

  const submissionHandler = async () => {
    setLoading(true);

    if (input.password == input.confirm) {
      setPasswordConfirm(false);
      try {
        const response = await base.api().post('user/register', {
          username: input.name,
          email: route.params.email,
          password: input.password,
        });
        successRegister();
        navigation.navigate('Login');
      } catch (error) {
        ErrorRegister();
        console.log(error);
        setLoading(false);
      }
    } else {
      setPasswordConfirm(true);
    }
    setLoading(false);
  };

  const inputHandler = (text, inputType) => {
    if (inputType == 'password' && text.length < 6 && text.length != 0) {
      setPasswordWarning(true);
    } else {
      setPasswordWarning(false);
    }
    if (inputType == 'name' && text.length < 6 && text.length != 0) {
      setNameWarning(true);
    } else {
      setNameWarning(false);
    }

    setInput({
      ...input,
      [inputType]: text,
    });
  };
  useEffect(() => {
    if (input.confirm === input.password && input.confirm.length > 5) {
      setEqual(true);
    } else {
      setEqual(false);
    }
  }, [input]);

  return (
    <>
      {loading ? (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <></>
      )}
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Profile & Password</Text>
              <Text
                style={{
                  color: '#838589',
                  fontWeight: '400',
                  fontSize: 14 * dimension,
                }}>
                Complete the following latest data to enter the Mega Mall
                application
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputCellContainer}>
                <Text style={styles.label}> Full Name </Text>
                <TextInput
                  placeholderTextColor={colors.darkgray}
                  placeholder="Enter your full name"
                  style={[styles.input]}
                  onChangeText={text => {
                    inputHandler(text, 'name');
                  }}
                />
                {nameWarning ? (
                  <View style={styles.warning}>
                    <Ionicons
                      name={'alert-circle-outline'}
                      size={24}
                      color={'#838589'}
                    />
                    <Text style={{color: '#838589'}}>
                      Name must be 6 characters or more
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.inputCellContainer}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    placeholderTextColor={colors.darkgray}
                    placeholder="Enter your password"
                    onChangeText={text => {
                      inputHandler(text, 'password');
                    }}
                    secureTextEntry={passwordType}
                  />
                  <View style={{position: 'absolute', right: 0}}>
                    {passwordType ? (
                      <IconButton
                        size={24}
                        color={'#838589'}
                        onPress={changePasswordVisibility}
                        name={'eye-outline'}
                      />
                    ) : (
                      <IconButton
                        size={24}
                        color={'#838589'}
                        onPress={changePasswordVisibility}
                        name={'eye-off-outline'}
                      />
                    )}
                  </View>
                </View>
                {passwordWarning ? (
                  <View style={styles.warning}>
                    <Ionicons
                      name={'alert-circle-outline'}
                      size={24}
                      color={'#838589'}
                    />
                    <Text style={{color: '#838589'}}>
                      Password must be 6 characters or more
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>

              <View style={styles.inputCellContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    placeholderTextColor={colors.darkgray}
                    placeholder="Confirm your password"
                    onChangeText={text => {
                      inputHandler(text, 'confirm');
                    }}
                    secureTextEntry={confirmType}
                  />
                  <View style={{position: 'absolute', right: 0}}>
                    {confirmType ? (
                      <IconButton
                        size={24}
                        color={'#838589'}
                        onPress={changeConfirmVisibility}
                        name={'eye-outline'}
                      />
                    ) : (
                      <IconButton
                        size={24}
                        color={'#838589'}
                        onPress={changeConfirmVisibility}
                        name={'eye-off-outline'}
                      />
                    )}
                  </View>
                </View>
                {passwordWarning ? (
                  <View style={styles.warning}>
                    <Ionicons
                      name={'alert-circle-outline'}
                      size={24}
                      color={'#838589'}
                    />
                    <Text style={{color: '#838589'}}>
                      Password must be 6 characters or more
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{height: px(60), margin: px(20)}}>
        <Button
          backgroundColor={equal ? colors.blue : colors.disabledButton}
          color={'white'}
          onPress={equal ? submissionHandler : () => {}}>
          Confirmation
        </Button>
      </View>
    </>
  );
};

export default ProfilePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: px(25),
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
  headerContainer: {
    marginTop: px(30),
  },
  headerText: {
    fontWeight: '700',
    fontSize: px(25),
    marginBottom: px(20),
    color: '#0C1A30',
  },
  inputContainer: {
    marginTop: px(50),
    flex: 1,
  },
  input: {
    color: colors.fontColor,
    backgroundColor: colors.softGray,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  label: {
    marginBottom: px(20),
    color: '#0C1A30',
  },
  inputCellContainer: {
    marginBottom: px(30),
  },
  warning: {
    flexDirection: 'row',
    marginTop: px(10),
    alignItems: 'center',
  },
});
