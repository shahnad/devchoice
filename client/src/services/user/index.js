import api from "../../axios";
import {
  getUserListBegins,
  getUserListFails,
  getUserListSuccess
} from "../../redux/action/UserActions";

export const getUserList = (payload) => {
  return (dispatch) => {
    dispatch(getUserListBegins())
    api.get('users')
      .then(function (response) {
        dispatch(getUserListSuccess(response.data))
      })
      .catch(function (error) {
        console.log(error.response,"error");
       dispatch(getUserListFails())
      })
  };
};