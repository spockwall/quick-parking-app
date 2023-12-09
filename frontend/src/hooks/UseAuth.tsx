import { useCallback, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { roleType } from "../types";
import { AUTHACTION } from "../reducers/authReducer";
import type { authState } from "../types";

export default function useAuth() {
    const { authState, authDispatch } = useContext(AuthContext);

    const logout = useCallback(() => {
        authDispatch({ type: AUTHACTION.LOGOUT, payload: {} as authState });
    }, [authDispatch]);

    const login = useCallback(
        (token: string, role: roleType) => {
            authDispatch({ type: AUTHACTION.LOGIN, payload: { token, role } });
        },
        [authDispatch]
    );

    return { authState, login, logout };
}
