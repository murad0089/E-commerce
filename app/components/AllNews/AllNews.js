import {View} from 'react-native';
import React from 'react';
import LatestNewsList from '../HomePage/LatestNews/LatestNewsList';
const AllNews = () => {
  return (
    <View>
      <LatestNewsList amountOfNews={null} extraRender={true} />
    </View>
  );
};

export default AllNews;
