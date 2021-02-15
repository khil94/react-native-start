import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions ,TextInput} from 'react-native';
import { useTodoDispatch, useTodoNextId } from '../store/todoContext';
import TodoItemBoard from './todoItemBoard';

const height_unit = Dimensions.get('window').height*(1/812);
const width_unit = Dimensions.get('window').width*(1/375);

export default function TodoScreen({navigation}){

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const [todoInput, SetInput] = useState('');

    const onMakeTodo = ()=>{
        if(todoInput==''){
            Alert.alert('할일을 입력해주세요','새로운 할일을 입력해 보세요');
        }else{
            const todo = {
                id: nextId.current,
                title: todoInput,
                content:'',
                favorite:false,
            }
            SetInput('');
            dispatch({type:'CREATE',todo});
            nextId.current+=1;
        }
    }

    return(
        <View style={{flex:1,backgroundColor:"white", alignItems:'center'}}>
            {/* {console.log(todoes)} */}
            <View >
                <Text style={TodoStyles.Title}>To Do List</Text>
            </View>
            <View style={{paddingBottom:width_unit*36, flexDirection:'row' }}>
                <TextInput 
                    style={TodoStyles.Input}
                    placeholder="새로운 할일을 입력하세요"
                    placerholderTextColor= "#3d3635"
                    onChangeText={(input)=>{SetInput(input)}}
                    value={todoInput}    
                />
                <TouchableOpacity onPress={onMakeTodo}>
                    <View style={TodoStyles.TextBox}>
                        <Text style={{color:'white'}}>
                            +추가
                        </Text>
                    </View>
                </TouchableOpacity >
            </View>
            <TodoItemBoard navigation={navigation} isFavo={false}/>
        </View>
    );
}

const TodoStyles = StyleSheet.create({
    TextBox:{
        justifyContent:'center',
        alignItems: 'center',
        width: width_unit*68,
        height: height_unit*32,
        borderRadius: 4,
        backgroundColor: "#181818",
        marginRight:width_unit*24,
    },
    Title:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop: width_unit*24,
        marginHorizontal: width_unit*20,
        marginBottom: height_unit*21,
        width: width_unit*335,
        height: height_unit*30,
        fontSize: 24,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 30,
        letterSpacing: 0,
        color: "#181818"
    },
    Input:{
        height:height_unit*32,
        borderBottomWidth:1,
        borderBottomColor:'black',
        width: width_unit*255,
        marginLeft:width_unit*20,
        marginRight:width_unit*12,
    },
})