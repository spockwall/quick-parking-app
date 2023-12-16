import { userInfo } from "../types";
import Cookies from "js-cookie";
export class LoginService {
    public async login(userId: string, password: string): Promise<string | null> {
        // POST /auth/login
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    password,
                }),
            });
            const { token } = await res.json();
            return token || null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
    public async logout(): Promise<void> {
        // POST /auth/logout
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: Cookies.get("jwt"),
                }),
            });
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    public async checkFirstLogin(user: userInfo): Promise<boolean> {
        // GET /staff/users/:id
        return user.phone === "" && user.email === null && user.licensePlateNumbers === undefined;
    }
}
