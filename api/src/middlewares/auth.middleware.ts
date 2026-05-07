import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { UnauthorizedError } from "../utils/errors";

export interface AuthRequest extends Request {
  user?: { id_user: string; role?: string; is_demo_user?: boolean };
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

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { id_user: string };
    req.user = { id_user: decoded.id_user };
    return next();
  } catch {
    return next(new UnauthorizedError("Token invalido o expirado"));
  }
};
