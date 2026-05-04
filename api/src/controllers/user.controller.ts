import { Request, Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";
import userService from "../services/user.service";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../utils/errors";

class UserController {
  async createUser(req: Request, res: Response) {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  }

  async authUser(req: Request, res: Response) {
    const { token } = req.body;
    if (!token) {
      throw new ValidationError("Token requerido");
    }

    const user = await userService.authUser(token);
    res.status(200).json(user);
  }

  async getMe(req: AuthRequest, res: Response) {
    const id_user = req.user?.id_user;
    if (!id_user) {
      throw new UnauthorizedError("No autorizado");
    }

    const user = await userService.getMe(id_user);
    res.status(200).json(user);
  }

  async updateMe(req: AuthRequest, res: Response) {
    const id_user = req.user?.id_user;
    if (!id_user) {
      throw new UnauthorizedError("No autorizado");
    }

    const updatedUser = await userService.updateMe(id_user, req.body);
    res.status(200).json(updatedUser);
  }

  async registerUser(req: Request, res: Response) {
    const createdUser = await userService.registerUser(req.body);
    res.status(201).json(createdUser);
  }

  async loginUser(req: Request, res: Response) {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
  }

  async verifyToken(req: Request, res: Response) {
    const token = req.query.token as string;
    if (!token) {
      throw new ValidationError("Token requerido");
    }

    const user = await userService.findByToken(token);
    if (!user) {
      throw new NotFoundError("Token invÃ¡lido o expirado.");
    }

    const message = await userService.verify(token);
    res.status(200).json({ message });
  }

  async getAllUsers(_req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await userService.getUser(req.params.id_user);
    res.json(user);
  }

  async getSelectedUser(req: AuthRequest, res: Response) {
    const user = await userService.getSelectedUser(
      req.params.id_user,
      req.user?.id_user,
    );
    res.json(user);
  }

  async getAllLiDataUsers(req: AuthRequest, res: Response) {
    const liData = await userService.getAllLiDataUsers(req.user?.id_user);
    res.json(liData);
  }

  async getAllTeachers(_req: Request, res: Response) {
    const teachers = await userService.getAllTeachers();
    res.json(teachers);
  }

  async getAllStudents(_req: Request, res: Response) {
    const students = await userService.getAllStudents();
    res.json(students);
  }

  async getUserByName(req: Request, res: Response) {
    const user = await userService.getUserByName(req.params.name);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const updated = await userService.updateUser(req.params.id_user, req.body);
    res.json(updated);
  }

  async updateUserRole(req: AuthRequest, res: Response) {
    const { id_user } = req.params;
    const { id_role } = req.body;

    if (!id_role) {
      throw new ValidationError("id_role es necesario");
    }
    if (!id_user) {
      throw new ValidationError("id_user es necesario");
    }

    const updatedRole = await userService.updateUserRole(
      id_user,
      id_role,
      req.user?.id_user,
    );
    res.json(updatedRole);
  }

  async deleteUser(req: AuthRequest, res: Response) {
    await userService.deleteUser(req.params.id_user, req.user?.id_user);
    res.json({ message: "User deleted" });
  }
}

export default new UserController();
