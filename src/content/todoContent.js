import React from 'react';
import { View, Image, Text, Alert, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import { useTodoState, useTodoDispatch } from '../store/todoContext';
import Icon from 'react-native-vector-icons/AntDesign';

const height_unit = Dimensions.get('window').height*(1/812);
const width_unit = Dimensions.get('window').width*(1/375);

export default function TodoContent({navigation, route}){
    const target = route.params;
    const dispatch = useTodoDispatch();

    const {id,title,content,favorite} = target

    const onDelete = ()=>{
        Alert.alert("삭제","할일을 삭제하시겠습니까?",[
            {  
                text:"취소",
            },
            {
                text:"확인",
                onPress: ()=>{
                    dispatch({type:'REMOVE',id:id});
                    navigation.goBack();
                }
            }
        ]);
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
                <Text style={TodoStyles.ContentText}>{content}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-end', marginRight:width_unit*20 }}>
                <TouchableOpacity onPress={()=>navigation.navigate('contentEdit',target)}>
                    <View style={{...TodoStyles.ContentBtn, backgroundColor:'#181818'}}>
                        <Icon name='edit'size={width_unit*12} color="white"/>
                        <Text style={{marginLeft:width_unit*6,color:'white',fontSize: 14, fontWeight: "bold",}}>수정</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <View style={{...TodoStyles.ContentBtn, backgroundColor:'#e75f3d'}}>
                        <Icon name='delete'size={width_unit*12} color="white"/>
                        <Text style={{marginLeft:width_unit*6,color:'white',fontSize: 14, fontWeight: "bold",}}>삭제</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <TextInput style={TodoStyles.ContentBox} value={target.content}/> */}
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
    ContentText:{
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        color: "#181818",
        padding:18
    },
    ContentBtn:{
        flexDirection:'row',
        width: width_unit*68,
        height: height_unit*32,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:width_unit*8,
        borderRadius: 4,
    }
})

