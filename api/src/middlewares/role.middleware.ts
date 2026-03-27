import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import userService from "../services/user.service";

export const authorizeRoles =
  (...allowedRoles: string[]) =>
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id_user = req.user?.id_user;

      if (!id_user) {
        return res.status(401).json({ error: "No autorizado" });
      }

      const roleName = await userService.getUserRoleName(id_user);

      if (!roleName) {
        return res.status(403).json({ error: "Rol no autorizado" });
      }

      if (!allowedRoles.includes(roleName)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      req.user = {
        id_user,
        role: roleName,
      };

      next();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
