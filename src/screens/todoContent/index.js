import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import TodoContent from './todoContent';
import TodoContentEdit from './todoContentEdit';

const Stack = createStackNavigator();

const width_unit = Dimensions.get('window').width * (1 / 375);
const height_unit = Dimensions.get('window').height * (1 / 812);

export default ContentNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowRadius: 4,
          shadowOpacity: 1,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          borderBottomWidth: width_unit * 2,
          borderColor: '#dadadd',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontStyle: 'normal',
          fontWeight: 'bold',
        },

        cardStyle: {backgroundColor: 'white'},
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}
      style={TopTabStyle.tabStyle}
    >
      <Stack.Screen name="content" component={TodoContent} options={{title: '할일'}} />
      <Stack.Screen name="contentEdit" component={TodoContentEdit} options={{title: '수정'}} />
    </Stack.Navigator>
  );
};

const TopTabStyle = StyleSheet.create({
  tabStyle: {
    marginTop: getStatusBarHeight(),
    backgroundColor: '#ffffff',
  },
});
