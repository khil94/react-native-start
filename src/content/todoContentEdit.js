import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import { useTodoDispatch } from '../store/todoContext';

const height_unit = Dimensions.get('window').height*(1/812);
const width_unit = Dimensions.get('window').width*(1/375);

export default function TodoContentEdit({navigation, route}){
    const target = route.params;
    const dispatch = useTodoDispatch();

    const {id,title,content,favorite} = target
    
    const [contentText, setContentText] = useState(content);

    const onConfirm = ()=>{
        const newTodo= {
            id:id,
            favorite:favorite,
            content:contentText,
            title:title
        }
        dispatch({type:'EDIT',newTodo});
        navigation.navigate('content',newTodo);
    }

    return(
        <View>
            <View style={TodoStyles.Todo}>
                <Image 
                    source={favorite ? 
                        require('/Users/airi/Desktop/forPractice/test1/public/star_favo.png'):
                        require('/Users/airi/Desktop/forPractice/test1/public/star_nofavo.png')}
                    style={{width:width_unit*24, height:height_unit*24, marginRight:width_unit*8}}
                />
                <Text style={TodoStyles.TodoText}>{title}</Text>
            </View>
            <View style={TodoStyles.ContentBox}>
                <TextInput 
                    style={{padding:18, paddingTop:18}}
                    value={contentText}
                    multiline={true}
                    placeholder="텍스트를 입력하세요"
                    placerholderTextColor= "#3d3635"
                    onChangeText={(input)=>{setContentText(input)}}
                />
            </View>
            <TouchableOpacity style={{alignItems:'center'}} onPress={onConfirm}>
                <View 
                    style={contentText === '' ? {...TodoStyles.ContentBtn, backgroundColor:'#C0C0C0'}: TodoStyles.ContentBtn}>
                    <Text style={ TodoStyles.BtnText}>확인</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const TodoStyles = StyleSheet.create({
    ContentBox:{
        width: width_unit*335,
        height: height_unit*544,
        borderRadius: 4,
        backgroundColor: '#DCDCDC',
        marginLeft:width_unit*20,
        marginBottom:height_unit*16,
    },
    Todo:{
        width: width_unit*280,
        height: height_unit*22,
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        marginTop:height_unit*31,
        marginLeft: width_unit*20,
        marginBottom: height_unit*16,
    },
    TodoText: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        color: "#181818",
    },
    ContentBtn:{
        width: width_unit*335,
        height: height_unit*48,
        borderRadius: 4,
        backgroundColor: "#181818",
        justifyContent:'center'
    },
    BtnText:{
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    }
})

