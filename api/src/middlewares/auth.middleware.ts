import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id_user: string };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("token:", req.headers.authorization);

    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  const SECRET = process.env.SECRET as string;

  try {
    const decoded = jwt.verify(token, SECRET) as { id_user: string };
    console.log("decoded:", decoded);
    req.user = { id_user: decoded.id_user };
    next();
  } catch {
    console.log("token mal");
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
