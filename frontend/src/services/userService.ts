import { roleType, userInfo } from "../types";

export class UserService {
    public async getUserInfo(id: string): Promise<userInfo> {
        // GET /staff/users/:id
        try {
            const response = await fetch(`/api/staff/users/${id}`, {
                method: "GET",
                credentials: "include",
            });
            return await response.json();
        } catch (err) {
            console.log(err);
            return {} as userInfo;
        }
    }

    public async updateUserInfo(newInfo: userInfo): Promise<boolean> {
        // PATCH /staff/users/:id
        // TODO : need test
        try {
            const response = await fetch(`/api/staff/users/${newInfo.userId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: newInfo.userId,
                    name: newInfo.name,
                    phone: newInfo.phone,
                    email: newInfo.email,
                    licensePlates: newInfo.licensePlateNumbers,
                }),
            });
            return response.ok;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async createUser(id: string, password: string, role: roleType): Promise<boolean> {
        // POST /users
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: id,
                    password,
                    role,
                }),
            });
            console.log(await response.json());
            return response.ok;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // Register
    public async registerStaff(
        userId: string,
        name: string,
        licensePlateNumber: string,
        phone: string,
        email: string,
        password: string
    ): Promise<boolean> {
        // PATCH /staff/users/:id
        // TODO : need test
        try {
            const response = await fetch(`/api/staff/users/${userId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    password,
                    licensePlateNumber: [licensePlateNumber],
                }),
            });
            console.log(await response.json());
            return response.ok;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    public async registerGuard(id: string, name: string, password: string): Promise<boolean> {
        console.log(id, name, password);
        // PATCH /users/:id
        // TODO : need test
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });
            console.log(await response.json());
            return response.ok;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
