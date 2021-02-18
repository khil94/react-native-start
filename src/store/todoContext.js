import React, {useReducer, createContext, useContext} from 'react';

const todos = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data;
    case 'CREATE':
      return [...state, action.todo];
    case 'FAVORITE':
      return state.map((todo) => {
        return todo.id === action.id ? {...todo, favorite: !todo.favorite} : todo;
      });
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    case 'UPDATE':
      const {id, content} = action.newTodo;
      return state.map((todo) => {
        return todo.id === id ? {...todo, content: content} : todo;
      });
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export const TodoProvider = ({children}) => {
  const [state, dispatch] = useReducer(todoReducer, todos);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find StateContext');
  } else {
    return context;
  }
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find DispatchContext');
  } else {
    return context;
  }
};
