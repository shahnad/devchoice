import {
    GET_USER_LIST_BEGINS,
  GET_USER_LIST_FAILS,
    GET_USER_LIST_SUCCESS,
} from "../constants";


export const getUserListBegins = () => {
  return {
    type: GET_USER_LIST_BEGINS,
  }
};

export const getUserListSuccess = (payLoad) => {
  return {
    type: GET_USER_LIST_SUCCESS,
    payLoad
  }
};

export const getUserListFails = (payLoad) => {
  return {
    type: GET_USER_LIST_FAILS,
    payLoad       
  }
};
