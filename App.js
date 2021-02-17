import React from 'react';
import 'react-native-gesture-handler';
import RootNav from 'screens';
import {TodoProvider} from 'store/todoContext';

export default function App() {
  return (
    <TodoProvider>
      <RootNav />
    </TodoProvider>
  );
}
