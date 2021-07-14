import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from "../constants";

export const OpenNotification = (payLoad) => {
    return {
        type: OPEN_NOTIFICATION,
        payLoad
    }
};

export const CloseNotification = () => {
    return {
        type: CLOSE_NOTIFICATION,
    }
};
