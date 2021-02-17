import React from 'react';
import {View, Image, Text, Alert, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {useTodoDispatch} from 'store/todoContext';
import * as API from 'network/APIRequest';

const height_unit = Dimensions.get('window').height * (1 / 812);
const width_unit = Dimensions.get('window').width * (1 / 375);

export default function TodoContent({navigation, route}) {
  const dispatch = useTodoDispatch();

  const target = route.params;

  const onDelete = () => {
    Alert.alert('삭제', '할일을 삭제하시겠습니까?', [
      {
        text: '취소',
      },
      {
        text: '확인',
        onPress: async () => {
          await API.deleteTodo(target.id);
          dispatch({type: 'REMOVE', id: target.id});
          navigation.navigate('listNav', {screen: '할일'});
        },
      },
    ]);
  };

  return (
    <View>
      <View style={TodoStyles.Todo}>
        <Image
          source={
            target.favorite
              ? require('/Users/airi/Desktop/forPractice/test1/public/star_favo.png')
              : require('/Users/airi/Desktop/forPractice/test1/public/star_nofavo.png')
          }
          style={{width: width_unit * 24, height: height_unit * 24, marginRight: width_unit * 8}}
        />
        <Text style={TodoStyles.TodoText}>{target.title}</Text>
      </View>
      <View style={TodoStyles.ContentBox}>
        <Text style={TodoStyles.ContentText}>{target.content}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: width_unit * 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('contentEdit', target)}>
          <View style={TodoStyles.ContentBtn}>
            <Image
              source={require('/Users/airi/Desktop/forPractice/test1/public/edit.png')}
              style={{width: width_unit * 12, height: width_unit * 12}}
            />
            <Text style={{marginLeft: width_unit * 6, color: 'white', fontSize: 14, fontWeight: 'bold'}}>수정</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <View style={{...TodoStyles.ContentBtn, backgroundColor: 'rgb(231,95,61)'}}>
            <Image
              source={require('/Users/airi/Desktop/forPractice/test1/public/delete.png')}
              style={{width: width_unit * 12, height: width_unit * 12}}
            />
            <Text style={{marginLeft: width_unit * 6, color: 'white', fontSize: 14, fontWeight: 'bold'}}>삭제</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const TodoStyles = StyleSheet.create({
  Todo: {
    width: width_unit * 280,
    height: height_unit * 22,
    flexDirection: 'row',
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
  ContentText: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    padding: 18,
  },
  ContentBtn: {
    flexDirection: 'row',
    width: width_unit * 68,
    height: height_unit * 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginLeft: width_unit * 8,
    backgroundColor: 'rgb(24,24,24)',
  },
});
