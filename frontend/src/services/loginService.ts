import { userInfo } from "../types";
import Cookies from "js-cookie";
export class LoginService {
    public async login(userId: string, password: string): Promise<string> {
        // POST /auth/login
        return await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                password,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                Cookies.set("jwt", res.token);
                return res.token;
            })
            .catch((err) => {
                console.log(err);
                return "";
            });
    }

    public async checkFirstLogin(user: userInfo): Promise<boolean> {
        // GET /staff/users/:id
        return user.phone === "" && user.email === null && user.licensePlateNumber === undefined;
    }
}
