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

      const accessProfile = await userService.getUserAccessProfile(id_user);
      const roleName = accessProfile.role;

      if (!roleName) {
        return next(new ForbiddenError("Rol no autorizado"));
      }

      if (!allowedRoles.includes(roleName)) {
        return next(new ForbiddenError("Acceso denegado"));
      }

      req.user = {
        id_user,
        role: roleName,
        is_demo_user: accessProfile.is_demo_user,
      };

      return next();
    } catch (err) {
      return next(err);
    }
  };

export const authorizeTeacherOrDemoAdmin = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const id_user = req.user?.id_user;

    if (!id_user) {
      return next(new UnauthorizedError("No autorizado"));
    }

    const accessProfile = await userService.getUserAccessProfile(id_user);

    if (
      accessProfile.role !== "teacher" &&
      !(accessProfile.role === "admin" && accessProfile.is_demo_user)
    ) {
      return next(new ForbiddenError("Acceso denegado"));
    }

    req.user = {
      id_user,
      role: accessProfile.role ?? undefined,
      is_demo_user: accessProfile.is_demo_user,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

export const forbidDemoUserMutation = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const id_user = req.user?.id_user;

    if (!id_user) {
      return next(new UnauthorizedError("No autorizado"));
    }

    const accessProfile = await userService.getUserAccessProfile(id_user);

    req.user = {
      id_user,
      role: accessProfile.role ?? undefined,
      is_demo_user: accessProfile.is_demo_user,
    };

    if (accessProfile.is_demo_user) {
      return next(
        new ForbiddenError(
          "Esta accion no esta disponible en la cuenta demo",
        ),
      );
    }

    return next();
  } catch (err) {
    return next(err);
  }
};
