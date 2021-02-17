import Api from './API';
import APIUri from './APIUri';

export const createTodo = async (todo) => {
  try {
    const url = APIUri.CREATE;
    const response = await Api.post(url, todo);
    // console.log("createTodo's url : ",url, " and Response is : ", response);

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getTodo = async (id) => {
  try {
    const url = APIUri.READ + id;
    const response = await Api.get(url);
    // console.log("getTodo's url : ",url, " and Response is : ",response);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getAllTodo = async () => {
  try {
    const url = APIUri.READ_ALL;
    const response = await Api.get(url);
    // console.log("getAllTodo's url : ",url, " and Response is : ",response);

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const postCreateTodo = async (id, title, content, favorite) => {
  try {
    const url = APIUri.CREATE;
    const data = {id, title, content, favorite};
    // const newTodo = removeKeyOfEmptyValue(data);
    const response = await Api.post(url, todo);
    // console.log("createTodo's url : ",url, " and Response is : ",response);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteTodo = async (id) => {
  try {
    const url = APIUri.DELETE + id;
    const response = await Api.delete(url);
    // console.log("deleteTodo's url : ",url, " and Response is : ",response);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const putFavorite = async (id) => {
  try {
    const url = APIUri.PUT_FAVORITE + id;
    const response = await Api.put(url);
    // console.log("putFavorite's url : ",url, " and Response is : ", response);
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateContent = async (newTodo) => {
  try {
    const url = APIUri.UPDATE_CONTENT;
    const response = await Api.put(url, newTodo);
    // console.log("updateContent's url : ",url, " and Response is : ", response);

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
