import { userInfo } from "../types";

export enum userActionType {
  CHANGE_NAME = "CHANGE_NAME",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_PHONE = "CHANGE_PHONE",
  CHANGE_ALL = "CHANGE_ALL",
  CHANGE_LICENSE_PLATE_NUMRER = "CHANGE_LICENSE_PLATE_NUMRER",
}

type userAction = {
  type: userActionType;
  payload: userInfo;
};

export const userReducer = (state: userInfo, action: userAction) => {
  switch (action.type) {
    case userActionType.CHANGE_NAME:
      return {
        ...state,
        name: action.payload?.name,
      };
    case userActionType.CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload?.email,
      };
    case userActionType.CHANGE_PHONE:
      return {
        ...state,
        phone: action.payload?.phone,
      };
    case userActionType.CHANGE_LICENSE_PLATE_NUMRER:
      return {
        ...state,
        licensePlateNumber: action.payload?.licensePlateNumber,
      };
    case userActionType.CHANGE_ALL:
      return {
        ...action.payload,
      };
    default:
      throw new Error(`不存在的 action type: ${action.type}`);
  }
};