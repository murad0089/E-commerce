import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FilterScreen from '../components/HomePage/Categories/FilterAndSorting/FilterScreen';
import SortScreen from '../components/HomePage/Categories/FilterAndSorting/SortScreen';
import {useNavigation} from '@react-navigation/native';
import px from '../assets/utility/dimension';
import IconButton from '../components/UI/IconButton';
import colors from '../config/colors';

const Tab = createMaterialTopTabNavigator();

const FilterTopTabs = () => {
  const navigator = useNavigation();
  navigator.isFocused;
  return (
    <>
      <Pressable
        android_ripple={'#fff'}
        onPress={() => {
          navigator.goBack();
        }}
        style={{flex: 1, backgroundColor: 'rgba(101, 96, 96,0.1)'}}
      />
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          paddingHorizontal: px(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            marginTop: px(80),
            paddingTop: px(25),
            paddingHorizontal: px(25),
            paddingBottom: px(10),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            style={{
              color: colors.fontColor,
              fontFamily: 'DMSans-Bold',
              fontSize: 20,
            }}>
            Filter & Sorting
          </Text>
          <IconButton
            name="close"
            color={colors.darkgray}
            size={27}
            onPress={navigator.goBack}
          />
        </View>

        <Tab.Navigator
          screenOptions={{swipeEnabled: false}}
          sceneContainerStyle={{
            maxHeight: '90%',
            backgroundColor: 'white',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Tab.Screen
            options={{backgroundColor: 'white'}}
            name="Filter"
            component={FilterScreen}
          />
          <Tab.Screen
            name="Sort"
            options={{backgroundColor: 'white'}}
            component={SortScreen}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default FilterTopTabs;
