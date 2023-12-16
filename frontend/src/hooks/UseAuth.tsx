import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AUTHACTION } from "../reducers/authReducer";
import type { roleType, userInfo, authState } from "../types";

export default function useAuth(permission: roleType | "any") {
    const { authState, authDispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        authDispatch({ type: AUTHACTION.LOGOUT, payload: {} as authState });
    }, [authDispatch]);

    const login = useCallback(
        async (token: string, role: roleType, user: userInfo) => {
            authDispatch({ type: AUTHACTION.LOGIN, payload: { token, role, user } });
        },
        [authDispatch]
    );
    useEffect(() => {
        if (permission === "any") {
            console.log("hi");
        } else if (authState.role && authState.role !== permission) {
            logout();
            navigate("/checkrole");
        }
    }, [navigate, authState.role, permission, logout]);

    return { authState, login, logout };
}
