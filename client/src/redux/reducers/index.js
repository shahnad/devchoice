import { combineReducers ,} from "redux";
import auth from "./authReducer";
import notification from "./notificationReducer";
import users from "./UserReducer";

export default combineReducers({ auth, notification,users});
