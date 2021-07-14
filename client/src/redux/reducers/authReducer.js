import { LOGIN_BEGINS, LOGIN_FAILS, LOGIN_SUCCESS, LOGOUT_BEGINS, LOGOUT_SUCCESS } from "../constants";


const initialState = {
  isLoading: false,
  user: {
    email: '',
    password: ''
  },
  authenticated: localStorage.getItem('authenticated') || false,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGINS:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_SUCCESS:
        return {
        ...state,
          isLoading: false,
          authenticated:true,
      }
    case LOGIN_FAILS:
        return {
        ...state,
        isLoading: false,
      }
    case LOGOUT_BEGINS:
        return {
        ...state,
        isLoading: true,
      }
    case LOGOUT_SUCCESS:
      console.log('pppp');
        return {
        ...state,
          isLoading: false,
         authenticated:false,
      }
    case LOGIN_FAILS:
       return {
        ...state,
          isLoading: false,
      }

    default:
      return state;
  }
}
