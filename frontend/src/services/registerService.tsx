export class RegisterService {
  public registerCarOwner(id: string, name: string, carId: string, phone: string, email: string, password: string): boolean {
    // PATCH /staff/users/:id
    return true;
  }

  public registerGuard(id: string, name: string, password: string): boolean {
    // 好像沒有 Guard 註冊 API...??
    return true;
  }
}