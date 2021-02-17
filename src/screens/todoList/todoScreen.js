import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, TextInput, Button} from 'react-native';

import TodoItemBoard from './todoItemBoard';
import * as API from 'network/APIRequest';
import {useTodoState, useTodoDispatch} from 'store/todoContext';

const height_unit = Dimensions.get('window').height * (1 / 812);
const width_unit = Dimensions.get('window').width * (1 / 375);

export default function TodoScreen({navigation}) {
  const dispatch = useTodoDispatch();
  const todos = useTodoState();

  const [nextId, setNextId] = useState();
  const [todoInput, setTodoInput] = useState('');

  const currentId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;

  useEffect(() => {
    setNextId(currentId);
  }, []);

  const onMakeTodo = async () => {
    if (todoInput == '') {
      Alert.alert('할일을 입력해주세요', '새로운 할일을 입력해 보세요', [{text: '확인'}]);
    } else if (todos.find((todo) => todo.title === todoInput)) {
      setTodoInput('');
      Alert.alert('중복된 할일입니다', '새로운 할일을 입력해 보세요', [{text: '확인'}]);
    } else {
      const todo = {
        id: nextId,
        title: todoInput,
        content: '',
        favorite: false,
      };
      setTodoInput('');
      await API.createTodo(todo);
      dispatch({type: 'CREATE', todo});
      setNextId(nextId + 1);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View>
        <Text style={TodoStyles.Title}>To Do List</Text>
      </View>
      <View style={{paddingBottom: width_unit * 36, flexDirection: 'row'}}>
        <TextInput
          autoCapitalize="none"
          style={TodoStyles.Input}
          placeholder="새로운 할일을 입력하세요"
          placerholderTextColor="rgb(124,124,124)"
          onChangeText={(input) => {
            setTodoInput(input);
          }}
          value={todoInput}
        />
        <TouchableOpacity onPress={onMakeTodo}>
          <View style={TodoStyles.TextBox}>
            <Text style={{color: 'white'}}>+추가</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TodoItemBoard navigation={navigation} isFavo={false} />
    </View>
  );
}

const TodoStyles = StyleSheet.create({
  Title: {
    width: width_unit * 335,
    height: height_unit * 30,
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 30,
    letterSpacing: 0,
    marginTop: width_unit * 24,
    marginHorizontal: width_unit * 20,
    marginBottom: height_unit * 21,
  },
  Input: {
    height: height_unit * 32,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: width_unit * 255,
    marginLeft: width_unit * 20,
    marginRight: width_unit * 12,
  },
  TextBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width_unit * 68,
    height: height_unit * 32,
    borderRadius: 4,
    backgroundColor: 'rgb(24,24,24)',
    marginRight: width_unit * 24,
  },
});
