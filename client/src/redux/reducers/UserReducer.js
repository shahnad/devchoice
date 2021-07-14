import {
    GET_USER_LIST_BEGINS,
    GET_USER_LIST_FAILS,
    GET_USER_LIST_SUCCESS
} from "../constants";


const initialState = {
    isLoading: false,
    userList:[],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_LIST_BEGINS:
             return {...state,isLoading:true }
        case GET_USER_LIST_SUCCESS:
            return { ...state, isLoading: false, userList: action.payLoad }
        case GET_USER_LIST_FAILS:
        return { ...state, isLoading: false, userList: [] }
       default:
            return state;
    }
}
