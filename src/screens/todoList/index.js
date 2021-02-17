import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import TodoScreen from './todoScreen';
import FavoriteScreen from './favoriteScreen';

const Tab = createMaterialTopTabNavigator();

const height_unit = Dimensions.get('window').height * (1 / 812);
const width_unit = Dimensions.get('window').width * (1 / 375);

export default TabNav = () => {
  return (
    <Tab.Navigator
      style={TopTabStyle.tabStyle}
      tabBarOptions={{
        labelStyle: TopTabStyle.label,
        indicatorStyle: {
          backgroundColor: 'black', //change underline's color
        },
      }}
    >
      <Tab.Screen name="todoList" component={TodoScreen} options={{title: '할일'}} />
      <Tab.Screen name="favoriteList" component={FavoriteScreen} options={{title: '즐겨찾기'}} />
    </Tab.Navigator>
  );
};

const TopTabStyle = StyleSheet.create({
  tabStyle: {
    marginTop: getStatusBarHeight(),
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: height_unit * 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  label: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    width: width_unit * 168,
    height: height_unit * 26,
    textAlign: 'center',
  },
});
