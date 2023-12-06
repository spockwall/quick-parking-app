import { useContext } from "react";
import { UserContext } from "../contexts/AuthContext";

export const useAuth = () => {
  let { userState, userDispatch } = useContext(UserContext);

  const login = (token: string, role: string) => {
    userDispatch({ type: "LOGIN", payload: { token, role } });
  };

  const logout = () => {
    userDispatch({ type: "LOGOUT" });
  };
	return { userState, login, logout };
};
