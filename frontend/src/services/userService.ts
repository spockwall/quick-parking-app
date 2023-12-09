import { userInfo } from "../types";

export class UserService {
  public getUserInfo(id: string): userInfo {
    return {
      id,
      phone: "1234567890",
      name: "John Doe",
      email: "123@gmail.com",
      licensePlateNumber: ["1234"],
      role: "staff",
      status: "common",
    };
  }

  // Change Personal Info
  public updateUserInfo(newInfo: userInfo): boolean {
    // TODO: update user info    
    // PATCH /staff/users/:id
    return newInfo.id !== "";
  }

  // Add user 
  public addUser(id: string, password: string, role: string): boolean {
    // POST /users
    return true;
  }

  // Register
  public registerStaff(id: string, name: string, carId: string, phone: string, email: string, password: string): boolean {
    // PATCH /staff/users/:id
    return true;
  }
  public registerGuard(id: string, name: string, password: string): boolean {
    // ?? PATCH /users/:id
    return true;
  }
}