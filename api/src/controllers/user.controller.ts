import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import userService from "../services/user.service";
import comparePassword from "../utils/comparePassword";

interface UserPayload {
  e_mail: string;
  [key: string]: any;
}

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async authUser(req: Request, res: Response) {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: "Token requerido" });
      }

      const user = await userService.authUser(token);
      res.status(200).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getMe(req: AuthRequest, res: Response) {
    try {
      const id_user = req.user?.id_user;
      if (!id_user) {
        return res.status(401).json({ error: "No autorizado" });
      }

      const user = await userService.getMe(id_user);
      res.status(200).json(user);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const newUser = req.body as UserPayload;
      const dbUserEmail = await userService.getUserByEmail(newUser.e_mail);
      if (dbUserEmail) {
        throw new Error("El usuario ya existe");
      }

      const createdUser = await userService.registerUser(newUser);
      res.status(201).json(createdUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const userFound: any = await userService.getUserByEmail(req.body.e_mail);
      if (!userFound) {
        throw new Error("Usuario no encontrado");
      }

      const matchPassword = await comparePassword(
        req.body.password,
        userFound.password,
      );
      if (!matchPassword) {
        throw new Error("ContraseÃ±a invÃ¡lida");
      }

      if (req.body.e_mail_verified) {
        throw new Error("Correo no verificado, revisa tu correo electrÃ³nico");
      }

      const user = await userService.loginUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      if (!token) {
        return res.status(400).json({ error: "Token requerido" });
      }

      const user = await userService.findByToken(token);
      if (!user) {
        throw new Error("Token invÃ¡lido o expirado.");
      }

      const message = await userService.verify(token);
      res.status(200).json({ message });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUser(req.params.id_user);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getSelectedUser(req: Request, res: Response) {
    try {
      const user = await userService.getSelectedUser(req.params.id_user);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAllLiDataUsers(req: Request, res: Response) {
    try {
      const liData = await userService.getAllLiDataUsers();
      res.json(liData);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await userService.getAllTeachers();
      res.json(teachers);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllStudents(req: Request, res: Response) {
    try {
      const students = await userService.getAllStudents();
      res.json(students);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserByName(req: Request, res: Response) {
    try {
      const user = await userService.getUserByName(req.params.name);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const updated = await userService.updateUser(req.params.id_user, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateUserRole(req: Request, res: Response) {
    try {
      const { id_user } = req.params;
      const { id_role } = req.body;

      if (!id_role) {
        throw new Error("id_role es necesario");
      }
      if (!id_user) {
        throw new Error("id_user es necesario");
      }

      const updatedRole = await userService.updateUserRole(id_user, id_role);
      res.json(updatedRole);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id_user);
      res.json({ message: "User deleted" });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new UserController();
