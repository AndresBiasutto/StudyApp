import { Request, Response } from "express";
import unitController from "../controllers/unit.controller";

class UnitHandler {
  async create(req: Request, res: Response) {
    try {
      console.log(req.body);
      const unit = await unitController.create(req.body);
      res.status(201).json(unit);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const unit = await unitController.getOne(req.params.id);
      res.json(unit);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const units = await unitController.getAll();
      res.json(units);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const unit = await unitController.getByName(req.params.name);
      if (!unit) return res.status(404).json({ error: "Unit not found" });
      res.json(unit);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await unitController.update(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      unitController.delete(req.params.id);
      res.json({ message: "Unit deleted" });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new UnitHandler();
