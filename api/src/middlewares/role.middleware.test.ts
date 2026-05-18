import { NextFunction, Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";
import {
  forbidDemoUserMutation,
  authorizeNonDemoRoles,
  authorizeRoles,
} from "../middlewares/role.middleware";
import userService from "../services/user.service";
import { ForbiddenError, UnauthorizedError } from "../utils/errors";

jest.mock("../services/user.service");

describe("Role Middleware", () => {
  const mockUserService = userService as jest.Mocked<typeof userService>;
  let mockRequest: Partial<AuthRequest>;
  let nextFunction: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {};
    nextFunction = jest.fn();
  });

  it("should forward UnauthorizedError when there is no authenticated user", async () => {
    await authorizeRoles("admin")(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalledWith(
      expect.objectContaining<Partial<UnauthorizedError>>({
        message: "No autorizado",
        statusCode: 401,
      }),
    );
  });

  it("should forward ForbiddenError when role is not allowed", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserAccessProfile = jest.fn().mockResolvedValue({
      role: "student",
      is_demo_user: false,
    });

    await authorizeRoles("admin")(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ForbiddenError>>({
        message: "Acceso denegado",
        statusCode: 403,
      }),
    );
  });

  it("should call next when role is allowed", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserAccessProfile = jest.fn().mockResolvedValue({
      role: "admin",
      is_demo_user: true,
    });

    await authorizeRoles("admin", "teacher")(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(mockRequest.user).toEqual({
      id_user: "user-123",
      role: "admin",
      is_demo_user: true,
    });
    expect(nextFunction).toHaveBeenCalledWith();
  });

  it("should block demo users on non-demo role middleware", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserAccessProfile = jest.fn().mockResolvedValue({
      role: "admin",
      is_demo_user: true,
    });

    await authorizeNonDemoRoles("admin")(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ForbiddenError>>({
        message: "Acceso denegado",
        statusCode: 403,
      }),
    );
  });

  it("should allow real admin on non-demo role middleware", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserAccessProfile = jest.fn().mockResolvedValue({
      role: "admin",
      is_demo_user: false,
    });

    await authorizeNonDemoRoles("admin")(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(mockRequest.user).toEqual({
      id_user: "user-123",
      role: "admin",
      is_demo_user: false,
    });
    expect(nextFunction).toHaveBeenCalledWith();
  });

  it("should block demo admin mutations", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserAccessProfile = jest.fn().mockResolvedValue({
      role: "admin",
      is_demo_user: true,
    });

    await forbidDemoUserMutation(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalledWith(
      expect.objectContaining<Partial<ForbiddenError>>({
        message: "Esta accion no esta disponible en la cuenta demo",
        statusCode: 403,
      }),
    );
  });

  it("should allow demo teacher mutations", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserAccessProfile = jest.fn().mockResolvedValue({
      role: "teacher",
      is_demo_user: true,
    });

    await forbidDemoUserMutation(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(mockRequest.user).toEqual({
      id_user: "user-123",
      role: "teacher",
      is_demo_user: true,
    });
    expect(nextFunction).toHaveBeenCalledWith();
  });
});
