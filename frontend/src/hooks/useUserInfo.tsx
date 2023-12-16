import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import type { userInfo } from "../types";

export default function useUserInfo() {
    const [userInfo, setUserInfoState] = useState<userInfo>({} as userInfo);
    const setUserInfo = (userInfo: userInfo) => {
        Cookies.set("userInfo", JSON.stringify(userInfo));
        setUserInfoState(userInfo);
    };
    useEffect(() => {
        const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
        setUserInfoState(userInfo);
    }, []);
    return { userInfo, setUserInfo };
}
