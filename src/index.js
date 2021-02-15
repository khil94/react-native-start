import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import TabNav from './screen';
import TodoContent from './content/todoContent';
import TodoContentEdit from './content/todoContentEdit';

const StackNaviagtor = createStackNavigator();


export default function RootNav({}){
  return(
    <StackNaviagtor.Navigator
      screenOptions={{
        headerTitleStyle:{
          fontSize: 20,
          fontStyle: 'normal',
          fontWeight: "bold",
        },
        cardStyle: RootStackStyle.card,
        headerStyle: RootStackStyle.header,
        headerBackTitleVisible:false,
        headerTintColor:'black'
      }}
    >
      <StackNaviagtor.Screen name='home' component={TabNav} options={{headerShown:false} }/>
      <StackNaviagtor.Screen name='content' component={TodoContent} options={{title:'할일',}}/>
      <StackNaviagtor.Screen name='contentEdit' component={TodoContentEdit} options={{title:'수정',}}/>

    </StackNaviagtor.Navigator>
  )
}
console.log(getStatusBarHeight())

const RootStackStyle = StyleSheet.create({
  header:{
    
  },
  card:{
    backgroundColor:'white'
    },  
})