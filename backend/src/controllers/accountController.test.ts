import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { login } from "./accountController";

jest.mock("@prisma/client");
jest.mock("jsonwebtoken");
jest.mock("../utils/encrypt");

// Since we're using TypeScript, we can define the mock implementations with proper typings
const mockedPrismaClient = PrismaClient as jest.MockedClass<
  typeof PrismaClient
>;
const mockedJwt = jwt as jest.Mocked<typeof jwt>;
const mockedEncryptUtils = {
  encryptPswd: jest.fn(),
  comparePswd: jest.fn(),
};

// Now we use the mocked versions in our tests
mockedPrismaClient.prototype.user.findUnique = jest
  .fn()
  .mockImplementation((args) => {
    if (args.where.userId === "b09901072") {
      return Promise.resolve({
        userId: "b09901072",
        password: "$2b$10$examplehashedpassword",
      });
    }
    return null;
  });

mockedEncryptUtils.comparePswd = jest
  .fn()
  .mockImplementation((password: string, hashedPassword: string) => {
    return (
      password === "123" && hashedPassword === "$2b$10$examplehashedpassword"
    );
  });

mockedJwt.sign = jest.fn().mockReturnValue("mocked.jwt.token");

describe("accountController", () => {
  describe("login", () => {
    it("should login with correct credentials", async () => {
      const req = {
        body: {
          userId: "b09901072",
          password: "123",
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it("should fail to login with incorrect credentials", async () => {
      const req = {
        body: {
          userId: "b09901072",
          password: "wrong-password",
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(String) })
      );
    });
  });
});
