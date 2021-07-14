import { LoginBegins, LoginSuccess, LoginFails, LogoutBegins, LogoutSuccess } from "../../redux/action/AuthActions";
import { OpenNotification } from "../../redux/action/NotifyAction";


export const UserLogin = (payload) => {
    return (dispatch) => {
        dispatch(LoginBegins(payload));
         dispatch(LoginSuccess(payload));
        localStorage.setItem("authenticated",true);
        dispatch(OpenNotification({
                isOpen: true,
                snackMessage: {
                    message: 'Logged in Successfully',
                    severity: 'success'
                }
            }))
        };
};

export const UserLogout = () => {
    return (dispatch) => {
        dispatch(LogoutBegins())
        localStorage.clear(); 
        dispatch(LogoutSuccess())
        dispatch(OpenNotification({
                isOpen: true,
                snackMessage: {
                    message: 'Logged out Successfully',
                    severity: 'success'
                }
            }))

    }
}