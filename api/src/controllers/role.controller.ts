import { Request, Response } from "express";
import roleService from "../services/role.service";

class RoleController {
  async create(req: Request, res: Response) {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const role = await roleService.getRole(req.params.id);
      res.json(role);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const roles = await roleService.getAllRoles();
      res.json(roles);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const role = await roleService.getRoleByName(req.params.name);
      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }

      res.json(role);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await roleService.updateRole(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await roleService.deleteRole(req.params.id);
      res.json({ message: "Role deleted" });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new RoleController();
