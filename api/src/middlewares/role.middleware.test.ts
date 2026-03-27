import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import userService from "../services/user.service";

jest.mock("../services/user.service");

describe("Role Middleware", () => {
  const mockUserService = userService as jest.Mocked<typeof userService>;
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it("should return 401 when there is no authenticated user", async () => {
    await authorizeRoles("admin")(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "No autorizado" });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should return 403 when role is not allowed", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserRoleName = jest.fn().mockResolvedValue("student");

    await authorizeRoles("admin")(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Acceso denegado" });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should call next when role is allowed", async () => {
    mockRequest.user = { id_user: "user-123" };
    mockUserService.getUserRoleName = jest.fn().mockResolvedValue("admin");

    await authorizeRoles("admin", "teacher")(
      mockRequest as AuthRequest,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockRequest.user).toEqual({
      id_user: "user-123",
      role: "admin",
    });
    expect(nextFunction).toHaveBeenCalled();
  });
});
