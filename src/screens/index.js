import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import TabNav from './todoList';
import TodoContent from './todoContent';
import * as API from 'network/APIRequest';
import {useTodoDispatch} from 'store/todoContext';

const StackNaviagtor = createStackNavigator();

export default function RootNav() {
  const dispatch = useTodoDispatch();

  useEffect(() => {
    const _getTodoList = async () => {
      const {data} = await API.getAllTodo();
      dispatch({type: 'GET_ALL', data: data});
    };
    _getTodoList();
  }, []);

  return (
    <NavigationContainer>
      <StackNaviagtor.Navigator
        screenOptions={{
          cardStyle: {backgroundColor: 'white'},
        }}
      >
        <StackNaviagtor.Screen name="listNav" component={TabNav} options={{headerShown: false}} />
        <StackNaviagtor.Screen name="contentNav" component={TodoContent} options={{headerShown: false}} />
      </StackNaviagtor.Navigator>
    </NavigationContainer>
  );
}
