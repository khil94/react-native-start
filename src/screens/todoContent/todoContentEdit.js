import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import {useTodoDispatch} from 'store/todoContext';
import * as API from 'network/APIRequest';

const height_unit = Dimensions.get('window').height * (1 / 812);
const width_unit = Dimensions.get('window').width * (1 / 375);

export default function TodoContentEdit({navigation, route}) {
  const dispatch = useTodoDispatch();
  const target = route.params;

  const [contentText, setContentText] = useState(target.content);

  const onConfirm = async () => {
    const newTodo = {
      id: target.id,
      favorite: target.favorite,
      content: contentText,
      title: target.title,
    };
    await API.updateContent(newTodo);
    dispatch({type: 'UPDATE', newTodo});
    navigation.navigate('content', newTodo);
  };

  return (
    <View>
      <View style={TodoStyles.Todo}>
        <Text style={TodoStyles.TodoText}>{target.title}</Text>
      </View>
      <View style={TodoStyles.ContentBox}>
        <TextInput
          autoCapitalize="none"
          style={{padding: 18, paddingTop: 18}}
          value={contentText}
          multiline={true}
          placeholder="텍스트를 입력하세요"
          placerholderTextColor="#3d3635"
          onChangeText={(input) => {
            setContentText(input);
          }}
        />
      </View>
      <TouchableOpacity style={{alignItems: 'center'}} onPress={onConfirm}>
        <View
          style={
            contentText === '' ? {...TodoStyles.ContentBtn, backgroundColor: 'rgb(178,178,178)'} : TodoStyles.ContentBtn
          }
        >
          <Text style={TodoStyles.BtnText}>확인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const TodoStyles = StyleSheet.create({
  Todo: {
    width: width_unit * 280,
    height: height_unit * 22,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: height_unit * 31,
    marginLeft: width_unit * 20,
    marginBottom: height_unit * 16,
  },
  TodoText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
  },
  ContentBox: {
    width: width_unit * 335,
    height: height_unit * 544,
    borderRadius: 4,
    backgroundColor: 'rgb(247, 247, 249)',
    marginLeft: width_unit * 20,
    marginBottom: height_unit * 16,
  },
  ContentBtn: {
    width: width_unit * 335,
    height: height_unit * 48,
    borderRadius: 4,
    backgroundColor: 'rgb(24,24,24)',
    justifyContent: 'center',
  },
  BtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
});
