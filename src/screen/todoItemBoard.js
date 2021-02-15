import React from 'react';
import { FlatList, View, Image, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { useTodoState, useTodoDispatch } from '../store/todoContext';



const height_unit = Dimensions.get('window').height*(1/812);
const width_unit = Dimensions.get('window').width*(1/375);

export default function TodoItemBoard({navigation,isFavo}){

    const todoes = useTodoState();
    const dispatch = useTodoDispatch();
    const favorites = todoes.filter((item)=>item.favorite === true)
    
    const items = isFavo? favorites : todoes;
    const onFavoToggle = (id)=>{
        dispatch({type:'FAVORITE', id})
    }
    const onContentView = (todo)=>{
        navigation.navigate('content',todo);
    }

    const noFavo = ()=>{
        return (
            <View >
                <View style={TodoStyles.WhaleBox}>
                    <Image source={require('/Users/airi/Desktop/forPractice/test1/public/whale.png')}/>
                </View>
                <View style={{alignItems:'center', marginBottom:height_unit*230}}>
                    <Text style={TodoStyles.WhaleText}>즐겨찾는 할일이 없어요</Text>
                </View>
                <TouchableOpacity 
                    style={{marginBottom:height_unit*45, alignItems:'center'}} 
                    onPress={()=>navigation.goBack()}>
                    <View style={TodoStyles.BackToList}>
                        <Text style={TodoStyles.BackToText}>
                            할일 리스트로 이동하기
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
    
        )
    }

    
    return (
            items.length === 0 && isFavo ? noFavo() :
                <FlatList
                    data={items}
                    keyExtractor={(item)=> item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>(
                        <TouchableOpacity onPress={()=>onContentView(item)} key={item.id} style={TodoStyles.Todo}>
                            <TouchableOpacity onPress={()=>onFavoToggle(item.id)}>
                                <Image 
                                    source={item.favorite ? 
                                        require('/Users/airi/Desktop/forPractice/test1/public/star_favo.png'):
                                        require('/Users/airi/Desktop/forPractice/test1/public/star_nofavo.png')}
                                    style={{width:24, height:24, marginLeft:12, marginRight:12}}
                                />
                            </TouchableOpacity>
                            <Text style={TodoStyles.TodoText}>{item.title}</Text>
                        </TouchableOpacity>
                )}
                />
    );
}


const TodoStyles = StyleSheet.create({
    Todo:{
        width: width_unit*335,
        height: height_unit*48,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent:'flex-start',
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#181818",
        marginBottom: height_unit*16,
    },
    TodoText: {
        marginLeft:0,
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        color: "#181818"
    },
    WhaleBox:{
        marginTop: height_unit*84,
        marginBottom: height_unit*9,
        marginHorizontal: width_unit*71,
        paddingTop: height_unit*73,
        paddingBottom: height_unit*78,
        paddingHorizontal: width_unit*32,
    },
    WhaleText:{
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#999999"
    },
    BackToList:{
        width: 335,
        height: 48,
        borderRadius: 4,
        backgroundColor: "#181818",
        justifyContent:'center',
        alignItems:'center'
    },
    BackToText:{
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        color: "#ffffff"
    }
})