import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { roleType } from "@/types";

export default function useAuth() {
    const { authState, authDispatch } = useContext(AuthContext);

    const login = (token: string, role: roleType) => {
        authDispatch({ type: "LOGIN", payload: { token, role } });
    };

    const logout = () => {
        authDispatch({ type: "LOGOUT" });
    };
    return { authState, login, logout };
}
