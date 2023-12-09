import type { userInfo } from "../types";
export class LoginService {
    public login(id: string, password: string, role: string): [string, userInfo] {
        // POST /auth/login
        console.log(id, password, role);
        const user: userInfo = {
            id,
            phone: "1234567890",
            name: "John Doe",
            email: "123@gmail.com",
            licensePlateNumber: ["1234"],
            role: "staff",
            status: "common",
        };
        return ["token", user];
    }

    public checkFirstLogin(id: string): boolean {
        // GET /staff/users/:id
        console.log(id);
        return true;
    }
}
