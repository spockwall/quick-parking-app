import { toast } from "react-toastify";
import Cookies from "js-cookie";
import type { authState } from "../types";

export enum AUTHACTION {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    UNEXPIRED = "UNEXPIRED",
}
export type authActionType = {
    type: AUTHACTION;
    payload: authState;
};

export const authReducer = (state: authState, action: authActionType): authState => {
    switch (action.type) {
        case AUTHACTION.LOGIN:
            toast.success("Login successfully");
            Cookies.set("role", action.payload.role, {
                expires: 7,
                secure: true,
            });
            Cookies.set("user", JSON.stringify(action.payload.user), {
                expires: 7,
                secure: true,
            });
            return action.payload;
        case AUTHACTION.LOGOUT:
            Cookies.remove("role");
            Cookies.remove("user");
            return { ...state, token: "", role: "" };
        case AUTHACTION.UNEXPIRED:
            return action.payload;
        default:
            return state;
    }
};
