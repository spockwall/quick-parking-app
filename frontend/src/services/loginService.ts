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
            if (token) {
                Cookies.set("jwt", token, {
                    expires: 7,
                    secure: true,
                });
            }
            return token || null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    public async checkFirstLogin(user: userInfo): Promise<boolean> {
        // GET /staff/users/:id
        return user.phone === "" && user.email === null && user.licensePlateNumber === undefined;
    }
}
