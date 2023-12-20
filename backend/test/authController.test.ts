import { Request, Response } from "express";
import { authenticateUser } from "../src/auth/authService";
import { login, logout } from "../src/controllers/accountController";
import { AppError } from "../src/err/errorHandler";

jest.mock("../src/auth/authService", () => ({
  authenticateUser: jest.fn(),
}));

const mockRequest = (sessionData: object) => {
  return {
    body: { ...sessionData },
  } as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("AuthController", () => {
  describe("login", () => {
    it("successfully logs in and returns a token", async () => {
      const req = mockRequest({ userId: "user123", password: "pass123" });
      const res = mockResponse();
      (authenticateUser as jest.Mock).mockResolvedValue("fakeToken");

      await login(req, res);

      expect(authenticateUser).toHaveBeenCalledWith("user123", "pass123");
      expect(res.cookie).toHaveBeenCalledWith("jwt", "fakeToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: "fakeToken",
      });
    });

    it("throws an error when userId or password is missing", async () => {
      const req = mockRequest({ userId: "user123" });
      const res = mockResponse();

      await expect(login(req, res)).rejects.toThrow(AppError);
      expect(res.json).not.toHaveBeenCalled();
    });

    it("throws an error when authenticateUser fails", async () => {
      const req = mockRequest({ userId: "user123", password: "pass123" });
      const res = mockResponse();
      const error = new Error("Authentication failed");
      (authenticateUser as jest.Mock).mockRejectedValue(error);

      await expect(login(req, res)).rejects.toThrow(error);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("successfully logs out and clears the cookie", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("jwt");
      expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
    });
  });
});
