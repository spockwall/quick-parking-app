import { toast } from "react-toastify";
import Cookies from "js-cookie";
import type { authState } from "../types";

export enum AUTHACTION {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}
type authActionType = {
    type: AUTHACTION;
    payload: authState;
};

export const authReducer = (state: authState, action: authActionType) => {
    switch (action?.type) {
        case AUTHACTION.LOGIN:
            toast.success("Login successfully");
            Cookies.set("token", action.payload.token, {
                expires: 7,
                secure: true,
            });
            Cookies.set("role", action.payload.role, {
                expires: 7,
                secure: true,
            });
            return { ...state, token: action.payload.token, role: action.payload.role };

        case AUTHACTION.LOGOUT:
            Cookies.remove("token");
            Cookies.remove("role");
            return { ...state, token: "", role: "" };

        default:
            return state;
    }
};
