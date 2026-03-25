import { Request, Response, NextFunction } from 'express';
import { authenticateJWT, AuthRequest } from '../middlewares/auth.middleware';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
    process.env.SECRET = 'test-secret';
  });

  describe('authenticateJWT', () => {
    it('should return 401 if no authorization header', () => {
      authenticateJWT(
        mockRequest as AuthRequest,
        mockResponse as Response,
        nextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token requerido' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 if token does not start with Bearer', () => {
      mockRequest.headers = {
        authorization: 'Basic some-token',
      };

      authenticateJWT(
        mockRequest as AuthRequest,
        mockResponse as Response,
        nextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token requerido' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authenticateJWT(
        mockRequest as AuthRequest,
        mockResponse as Response,
        nextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Token inválido o expirado' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should call next() and set user if token is valid', () => {
      mockRequest.headers = {
        authorization: 'Bearer valid-token',
      };
      const mockPayload = { id_user: 'user-123' };
      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      authenticateJWT(
        mockRequest as AuthRequest,
        mockResponse as Response,
        nextFunction,
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockRequest.user).toEqual({ id_user: 'user-123' });
    });

    it('should fail if SECRET is undefined (uses undefined as secret)', () => {
      delete process.env.SECRET;
      mockRequest.headers = {
        authorization: 'Bearer some-token',
      };
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authenticateJWT(
        mockRequest as AuthRequest,
        mockResponse as Response,
        nextFunction,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
    });
  });
});
