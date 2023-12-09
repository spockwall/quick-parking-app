import { useEffect, useReducer } from "react";
import { userInfo } from "../types";
import { UserService } from "../services/userService";
import { USERACTION, userReducer } from "../reducers/userReducer";

export default function useUserInfo(id: string) {
    // TODO: userInfo should be retrieved in context, don't call API here
    const [user, userDispatch] = useReducer(userReducer, {} as userInfo);
    useEffect(() => {
        const userService = new UserService();
        const user = userService.getUserInfo(id);
        userDispatch({ type: USERACTION.CHANGE_ALL, payload: user });
    }, [id]);
    return { user, userDispatch };
}
