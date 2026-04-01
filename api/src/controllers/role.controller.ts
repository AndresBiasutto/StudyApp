import { Request, Response } from "express";

import roleService from "../services/role.service";

class RoleController {
  async create(req: Request, res: Response) {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  }

  async getOne(req: Request, res: Response) {
    const role = await roleService.getRole(req.params.id);
    res.json(role);
  }

  async getAll(_req: Request, res: Response) {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  }

  async update(req: Request, res: Response) {
    const updated = await roleService.updateRole(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await roleService.deleteRole(req.params.id);
    res.json({ message: "Role deleted" });
  }
}

export default new RoleController();
