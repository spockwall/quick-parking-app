import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { roleType } from "../types";
import { AUTHACTION } from "../reducers/authReducer";
import type { authState } from "../types";

export default function useAuth() {
    const { authState, authDispatch } = useContext(AuthContext);

    const login = (token: string, role: roleType) => {
        authDispatch({ type: AUTHACTION.LOGIN, payload: { token, role } });
    };

    const logout = () => {
        authDispatch({ type: AUTHACTION.LOGOUT, payload: {} as authState });
    };
    return { authState, login, logout };
}
