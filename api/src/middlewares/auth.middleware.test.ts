import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { authenticateJWT, AuthRequest } from "../middlewares/auth.middleware";
import { UnauthorizedError } from "../utils/errors";

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let mockRequest: Partial<AuthRequest>;
  let nextFunction: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    nextFunction = jest.fn();
  });

  describe("authenticateJWT", () => {
    it("should forward UnauthorizedError if no authorization header", () => {
      authenticateJWT(mockRequest as AuthRequest, {} as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining<Partial<UnauthorizedError>>({
          message: "Token requerido",
          statusCode: 401,
        }),
      );
    });

    it("should forward UnauthorizedError if token does not start with Bearer", () => {
      mockRequest.headers = {
        authorization: "Basic some-token",
      };

      authenticateJWT(mockRequest as AuthRequest, {} as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining<Partial<UnauthorizedError>>({
          message: "Token requerido",
          statusCode: 401,
        }),
      );
    });

    it("should forward UnauthorizedError if token is invalid", () => {
      mockRequest.headers = {
        authorization: "Bearer invalid-token",
      };
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      authenticateJWT(mockRequest as AuthRequest, {} as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(
        expect.objectContaining<Partial<UnauthorizedError>>({
          message: "Token invalido o expirado",
          statusCode: 401,
        }),
      );
    });

    it("should call next() and set user if token is valid", () => {
      mockRequest.headers = {
        authorization: "Bearer valid-token",
      };
      (jwt.verify as jest.Mock).mockReturnValue({ id_user: "user-123" });

      authenticateJWT(mockRequest as AuthRequest, {} as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith();
      expect(mockRequest.user).toEqual({ id_user: "user-123" });
    });
  });
});
