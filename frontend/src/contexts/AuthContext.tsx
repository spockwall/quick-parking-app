import Cookies from "js-cookie";
import { createContext, useReducer, ReactNode, useEffect } from "react";
import { AUTHACTION, authReducer, authActionType } from "../reducers/authReducer";
import type { authState, roleType } from "../types";

type authContextType = {
    authState: authState;
    authDispatch: React.Dispatch<authActionType>;
};
export const AuthContext = createContext({} as authContextType);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [authState, authDispatch] = useReducer(authReducer, {} as authState);

    useEffect(() => {
        const token = Cookies.get("token") || "";
        const role = (Cookies.get("role") || "") as roleType;
        authDispatch({ type: AUTHACTION.UNEXPIRED, payload: { token, role } });
    }, []);

    return <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
