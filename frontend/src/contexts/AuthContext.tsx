import React, { useReducer, ReactNode } from "react";
import Cookies from "js-cookie";
import { authReducer } from "../reducers/authReducer";
import type { authState } from "../types";

export const AuthContext = React.createContext({} as any);

const initState: authState = {
    token: Cookies.get("token") || "",
    role: Cookies.get("role") || "",
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authState, authDispatch] = useReducer(authReducer, initState);
    return <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
