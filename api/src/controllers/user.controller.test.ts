import { Request, Response } from "express";
import userController from "../controllers/user.controller";
import userService from "../services/user.service";
import { ConflictError } from "../utils/errors";

jest.mock("../services/user.service");

describe("UserController", () => {
  const mockService = userService as jest.Mocked<typeof userService>;

  const createResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should create a user through the service", async () => {
      const req = {
        body: {
          name: "John",
          e_mail: "test@test.com",
          password: "password123",
        },
      } as Request;
      const res = createResponse();
      const mockUser = { id_user: "1", name: "John", e_mail: "test@test.com" };

      mockService.registerUser = jest.fn().mockResolvedValue(mockUser);

      await userController.registerUser(req, res);

      expect(mockService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should bubble ConflictError from the service", async () => {
      const req = {
        body: { e_mail: "existing@test.com" },
      } as Request;
      const res = createResponse();

      mockService.registerUser = jest
        .fn()
        .mockRejectedValue(new ConflictError("El usuario ya existe"));

      await expect(userController.registerUser(req, res)).rejects.toThrow(
        ConflictError,
      );
      expect(mockService.registerUser).toHaveBeenCalledWith(req.body);
    });
  });

  describe("loginUser", () => {
    it("should call userService.loginUser with correct data", async () => {
      const req = {
        body: {
          e_mail: "test@test.com",
          password: "password123",
        },
      } as Request;
      const res = createResponse();
      const mockResponse = {
        token: "jwt-token",
        id_user: "1",
        name: "John",
      };

      mockService.loginUser = jest.fn().mockResolvedValue(mockResponse as any);

      await userController.loginUser(req, res);

      expect(mockService.loginUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe("getMe", () => {
    it("should call userService.getMe with user id", async () => {
      const req = {
        user: { id_user: "user-123" },
      } as unknown as Request;
      const res = createResponse();
      const mockUser = { id_user: "user-123", name: "John" };

      mockService.getMe = jest.fn().mockResolvedValue(mockUser as any);

      await userController.getMe(req as any, res);

      expect(mockService.getMe).toHaveBeenCalledWith("user-123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("updateMe", () => {
    it("should update the authenticated user profile", async () => {
      const req = {
        user: { id_user: "user-123" },
        body: { name: "Jane", last_name: "Doe" },
      } as unknown as Request;
      const res = createResponse();
      const updatedUser = { id_user: "user-123", name: "Jane", last_name: "Doe" };

      mockService.updateMe = jest.fn().mockResolvedValue(updatedUser as any);

      await userController.updateMe(req as any, res);

      expect(mockService.updateMe).toHaveBeenCalledWith("user-123", {
        name: "Jane",
        last_name: "Doe",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe("getAllUsers", () => {
    it("should call userService.getAllUsers", async () => {
      const req = {} as Request;
      const res = createResponse();
      const mockUsers = [{ id_user: "1" }, { id_user: "2" }];

      mockService.getAllUsers = jest.fn().mockResolvedValue(mockUsers as any);

      await userController.getAllUsers(req, res);

      expect(mockService.getAllUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe("updateUser", () => {
    it("should call userService.updateUser with id and data", async () => {
      const req = {
        params: { id_user: "user-123" },
        body: { name: "Jane" },
      } as unknown as Request;
      const res = createResponse();
      const updatedUser = { id_user: "user-123", name: "Jane" };

      mockService.updateUser = jest.fn().mockResolvedValue(updatedUser as any);

      await userController.updateUser(req, res);

      expect(mockService.updateUser).toHaveBeenCalledWith("user-123", {
        name: "Jane",
      });
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe("deleteUser", () => {
    it("should call userService.deleteUser", async () => {
      const req = {
        params: { id_user: "user-123" },
      } as unknown as Request;
      const res = createResponse();

      mockService.deleteUser = jest.fn().mockResolvedValue(true);

      await userController.deleteUser(req, res);

      expect(mockService.deleteUser).toHaveBeenCalledWith("user-123");
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
    });
  });

  describe("updateUserRole", () => {
    it("should call userService.updateUserRole when id_role is provided", async () => {
      const req = {
        params: { id_user: "user-123" },
        body: { id_role: "role-1" },
      } as unknown as Request;
      const res = createResponse();
      const updatedUser = { id_user: "user-123", id_role: "role-1" };

      mockService.updateUserRole = jest
        .fn()
        .mockResolvedValue(updatedUser as any);

      await userController.updateUserRole(req, res);

      expect(mockService.updateUserRole).toHaveBeenCalledWith(
        "user-123",
        "role-1",
      );
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });
});
