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
  public updateUserInfo(newInfo: userInfo): boolean {
    // TODO: update user info
    return newInfo.id !== "";
  }
}