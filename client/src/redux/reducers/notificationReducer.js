import {
    CLOSE_NOTIFICATION,
    OPEN_NOTIFICATION
} from "../constants";

const initialState = {
    isOpen: false,
    snackMessage: {
        message: '',
        severity: ''
    },
    autoHideDuration: 6000,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_NOTIFICATION:

            return {
                ...state,
                ...action.payLoad

            }
        case CLOSE_NOTIFICATION:
            return {
                ...state,
                isOpen: false,
                snackMessage: {
                    message: '',
                    severity: ''
                }
            }
        default:
            return state;
    }
}
