import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import userService from "../services/user.service";
import { ForbiddenError, UnauthorizedError } from "../utils/errors";

export const authorizeRoles =
  (...allowedRoles: string[]) =>
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      const id_user = req.user?.id_user;

      if (!id_user) {
        return next(new UnauthorizedError("No autorizado"));
      }

      const roleName = await userService.getUserRoleName(id_user);

      if (!roleName) {
        return next(new ForbiddenError("Rol no autorizado"));
      }

      if (!allowedRoles.includes(roleName)) {
        return next(new ForbiddenError("Acceso denegado"));
      }

      req.user = {
        id_user,
        role: roleName,
      };

      return next();
    } catch (err) {
      return next(err);
    }
  };
