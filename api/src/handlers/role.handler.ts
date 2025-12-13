import { Request, Response } from "express";
import roleController from "../controllers/role.controller";

class RoleHandler {
  async create(req: Request, res: Response) {
    try {
        console.log(req.body)
      const role = await roleController.create(req.body);
      res.status(201).json(role);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const role = await roleController.getOne(req.params.id);
      res.json(role);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const roles = await roleController.getAll();
      res.json(roles);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const role = await roleController.getByName(req.params.name);
      if (!role) return res.status(404).json({ error: "Role not found" });
      res.json(role);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await roleController.update(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      roleController.delete(req.params.id);
      res.json({ message: "Role deleted" });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new RoleHandler();
