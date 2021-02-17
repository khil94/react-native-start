import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import TodoItemBoard from './todoItemBoard';

const height_unit = Dimensions.get('window').height * (1 / 812);
const width_unit = Dimensions.get('window').width * (1 / 375);

export default function FavoriteScreen({navigation}) {
  return (
    <View style={TodoStyles.TitleBox}>
      <View>
        <Text style={TodoStyles.Title}>즐겨찾기</Text>
      </View>
      <TodoItemBoard navigation={navigation} isFavo={true} />
    </View>
  );
}

const TodoStyles = StyleSheet.create({
  TitleBox: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Title: {
    marginTop: width_unit * 24,
    marginHorizontal: width_unit * 20,
    marginBottom: height_unit * 16,
    width: width_unit * 335,
    height: height_unit * 30,
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 30,
    letterSpacing: 0,
  },
});
