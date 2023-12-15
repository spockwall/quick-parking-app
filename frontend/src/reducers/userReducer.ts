import { userInfo } from "../types";

export enum USERACTION {
    CHANGE_NAME = "CHANGE_NAME",
    CHANGE_EMAIL = "CHANGE_EMAIL",
    CHANGE_PHONE = "CHANGE_PHONE",
    CHANGE_ALL = "CHANGE_ALL",
    CHANGE_LICENSE_PLATE_NUMRER = "CHANGE_LICENSE_PLATE_NUMRER",
}

type userActionType = {
    type: USERACTION;
    payload: userInfo;
};

export const userReducer = (state: userInfo, action: userActionType) => {
    switch (action.type) {
        case USERACTION.CHANGE_NAME:
            return {
                ...state,
                name: action.payload?.name,
            };
        case USERACTION.CHANGE_EMAIL:
            return {
                ...state,
                email: action.payload?.email,
            };
        case USERACTION.CHANGE_PHONE:
            return {
                ...state,
                phone: action.payload?.phone,
            };
        case USERACTION.CHANGE_LICENSE_PLATE_NUMRER:
            return {
                ...state,
                licensePlateNumber: action.payload?.licensePlateNumbers,
            };
        case USERACTION.CHANGE_ALL:
            return {
                ...action.payload,
            };
        default:
            throw new Error(`不存在的 action type: ${action.type}`);
    }
};
