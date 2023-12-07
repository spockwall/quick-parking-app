export class LoginService {
  public login(id: string, password: string, role: string): [boolean, string]{
    // POST /auth/login
    if (id === 'false') {
      return [false, ''];
    }
    return [true, "token"];
  }

  public checkFirstLogin(id: string): boolean {
    // GET /staff/users/:id
    const name = null;
    if (name === null) {
      return true;
    }
    return false;
  }
}
