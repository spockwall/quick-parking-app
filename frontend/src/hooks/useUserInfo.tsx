import useAuth from "./useAuth";
import { useEffect, useReducer } from "react";
import { USERACTION, userReducer } from "../reducers/userReducer";
import { userInfo } from "../types";

export default function useUserInfo(id: string) {
    const { authState } = useAuth("any");
    const [user, userDispatch] = useReducer(userReducer, {} as userInfo);
    useEffect(() => {
        userDispatch({ type: USERACTION.CHANGE_ALL, payload: authState.user });
    }, [id, authState.user]);
    return { user, userDispatch };
}
