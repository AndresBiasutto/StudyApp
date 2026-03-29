import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors";

export interface AuthRequest extends Request {
  user?: { id_user: string; role?: string };
}

export const authenticateJWT = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Token requerido"));
  }

  const token = authHeader.split(" ")[1];
  const SECRET = process.env.SECRET as string;

  try {
    const decoded = jwt.verify(token, SECRET) as { id_user: string };
    req.user = { id_user: decoded.id_user };
    return next();
  } catch {
    return next(new UnauthorizedError("Token inválido o expirado"));
  }
};
