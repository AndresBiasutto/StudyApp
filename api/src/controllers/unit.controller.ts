import { Request, Response } from "express";
import unitService from "../services/unit.service";

class UnitController {
  async create(req: Request, res: Response) {
    const unit = await unitService.createUnit(req.body);
    res.status(201).json(unit);
  }

  async getOne(req: Request, res: Response) {
    const unit = await unitService.getUnit(req.params.id);
    res.json(unit);
  }

  async getAll(_req: Request, res: Response) {
    const units = await unitService.getAllUnits();
    res.json(units);
  }

  async getByName(req: Request, res: Response) {
    const unit = await unitService.getUnitByName(req.params.name);
    res.json(unit);
  }

  async update(req: Request, res: Response) {
    const updated = await unitService.updateUnit(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await unitService.deleteUnit(req.params.id);
    res.json({ message: "Unit deleted" });
  }
}

export default new UnitController();
