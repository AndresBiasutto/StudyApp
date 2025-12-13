import { Request, Response } from "express";
import userController from "../controllers/user.controller";

class UserHandler {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userController.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  async registerUser(req: Request, res: Response) {
    try {
      const newUser = await userController.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      console.log(req.body + " desde el handler");
      const user = await userController.loginUser(req.body);
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

    const message = await userController.verify(token);
    res.status(200).json({ message });

  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

  async getUser(req: Request, res: Response) {
    try {
      const user = await userController.getUser(req.params.id_user);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userController.getAllUsers();
      res.json(users);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
  async getUserByName(req: Request, res: Response) {
    const user = await userController.getUserByName(req.params.name);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  }
  async updateUser(req: Request, res: Response) {
    try {
      const updated = await userController.updateUser(
        req.params.id_user,
        req.body
      );
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      userController.deleteUser(req.params.id_user);
      res.json({
        message: "User deleted",
      });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}
export default new UserHandler();
