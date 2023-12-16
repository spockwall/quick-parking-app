import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AUTHACTION } from "../enums";
import type { roleType, authState } from "../types";

export default function useAuth(permission: roleType) {
    const { authState, authDispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        authDispatch({ type: AUTHACTION.LOGOUT, payload: {} as authState });
    }, [authDispatch]);

    const login = useCallback(
        async (token: string, role: roleType) => {
            authDispatch({ type: AUTHACTION.LOGIN, payload: { token, role } });
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
