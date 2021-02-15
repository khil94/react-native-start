import React, {useReducer, createContext, useContext, useRef} from 'react';

const todoes = []

const todoReducer = (state,action)=>{
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'FAVORITE':
            return state.map(todo=>{
                return todo.id === action.id ? { ...todo, favorite: !todo.favorite} : todo
            });
        case 'REMOVE':
            return state.filter(todo=>todo.id !== action.id);
        case 'EDIT':
            const {id,content} = action.newTodo;
            return state.map(todo=>{
                return todo.id === id ? {...todo, content: content} : todo
            })
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export const TodoProvider = ({children})=>{
    const nextId = useRef(1);
    const [state,dispatch] = useReducer(todoReducer, todoes);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export const useTodoState = ()=>{
    const context = useContext(TodoStateContext);
    if(!context){
        throw new Error('Cannot find StateContext');
    }else{
        return context;
    }
    
}


export const useTodoDispatch = ()=>{
    const context = useContext(TodoDispatchContext);
    if(!context){
        throw new Error('Cannot find DispatchContext');
    }else{
        return context;
    }
}

export const useTodoNextId = ()=>{
    const context = useContext(TodoNextIdContext);
    if(!context){
        throw new Error('Cannot find NextIdContext');
    }else{
        return context;
    }
}