import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './src';
import { TodoProvider } from './src/store/todoContext';

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <RootNav/>
      </NavigationContainer>
    </TodoProvider>
  );
}

