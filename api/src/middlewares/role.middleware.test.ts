import { NextFunction, Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
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
    mockUserService.getUserRoleName = jest.fn().mockResolvedValue("student");

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
    mockUserService.getUserRoleName = jest.fn().mockResolvedValue("admin");

    await authorizeRoles("admin", "teacher")(
      mockRequest as AuthRequest,
      {} as Response,
      nextFunction,
    );

    expect(mockRequest.user).toEqual({
      id_user: "user-123",
      role: "admin",
    });
    expect(nextFunction).toHaveBeenCalledWith();
  });
});
