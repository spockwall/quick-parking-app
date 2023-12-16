import Cookies from "js-cookie";
import { AUTHACTION } from "../enums";
import type { authState } from "../types";

export type authActionType = {
    type: AUTHACTION;
    payload: authState;
};

export const authReducer = (state: authState, action: authActionType): authState => {
    switch (action.type) {
        case AUTHACTION.LOGIN:
            Cookies.set("role", action.payload.role, {
                expires: 7,
                secure: true,
            });
            return action.payload;
        case AUTHACTION.LOGOUT:
            Cookies.remove("role");
            return { ...state, token: "", role: "" };
        case AUTHACTION.UNEXPIRED:
            return action.payload;
        default:
            return state;
    }
};
