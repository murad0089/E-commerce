import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../config/colors';
import {useDispatch} from 'react-redux';
import px from '../../assets/utility/dimension';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

//sorts by title
const SearchBar = ({
  data,
  finalAction,
  navigateOnFocus = false,
  autoFocus = false,
}) => {
  const [input, setInput] = useState('');
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const filter = () => {
    const filteredData = data.filter(item => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = input.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    dispatch(finalAction({final: filteredData}));
  };

  useEffect(() => {
    filter();
  }, [input, data]);

  return (
    <View style={styles.container}>
      {navigateOnFocus && (
        <Pressable
          onPress={() =>
            navigation.navigate('categoryproducts', {
              id: '',
              title: 'All Products',
            })
          }
          style={styles.inputCover}
        />
      )}
      <TextInput
        editable={!navigateOnFocus}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        style={styles.input}
        onChangeText={text => setInput(text)}
      />
      <Feather name="search" color={colors.black} size={px(20)} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.softGray,
    borderRadius: 10,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px(15),
  },
  input: {
    color: colors.fontColor,
    height: px(50),
    flex: 1,
  },
  inputCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9,
  },
});
