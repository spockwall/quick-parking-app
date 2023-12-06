import React, { useReducer, ReactNode } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const UserContext = React.createContext({} as any);

export interface UserState {
  token: string;
  role: string;
}

const initState: UserState = {
  token: Cookies.get('token') || '',
  role: Cookies.get('role') || '',
};

const UserContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const UserReducer = (state: UserState, action: any) => {
    switch (action?.type) {
      case "LOGIN":
        toast.success("Login successfully");
        Cookies.set('token', action.payload.token, {
          expires: 7,
          secure: true,
        });
        Cookies.set('role', action.payload.role, {
          expires: 7,
          secure: true,
        });
        return { ...state, token: action.payload.token, role: action.payload.role };

      case "LOGOUT":
        Cookies.remove("token");
        Cookies.remove("role");
        return { ...state, token: '', role: '' };

      default:
        return state;
    }
  };

  const [userState, userDispatch] = useReducer(UserReducer, initState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;