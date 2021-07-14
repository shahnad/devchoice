import {
  LOGIN_BEGINS,
  LOGIN_SUCCESS,
  LOGOUT_BEGINS,
  LOGOUT_FAILS,
  LOGOUT_SUCCESS
} from "../constants";


export const LoginBegins = (payLoad) => {
  return {
    type: LOGIN_BEGINS,
    payLoad
  }
};

export const LoginSuccess = (payLoad) => {
  return {
    type: LOGIN_SUCCESS,
    payLoad
  }
};

export const LoginFails = (payLoad) => {
  return {
    type: LOGIN_SUCCESS,
    payLoad       
  }
};

export const LogoutBegins = () => {
  return {
    type: LOGOUT_BEGINS,
 }
};

export const LogoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  }
};

export const LogoutFails = () => {
  return {
    type: LOGOUT_FAILS,
  }
};
