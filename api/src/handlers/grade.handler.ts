import { Request, Response } from "express";
import gradeController from "../controllers/grade.controller";

class GradeHandler {
  async create(req: Request, res: Response) {
    try {
        console.log(req.body)
      const grade = await gradeController.create(req.body);
      res.status(201).json(grade);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const grade = await gradeController.getOne(req.params.id);
      res.json(grade);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const grades = await gradeController.getAll();
      res.json(grades);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const grade = await gradeController.getByName(req.params.name);
      if (!grade) return res.status(404).json({ error: "Grade not found" });
      res.json(grade);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await gradeController.update(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      gradeController.delete(req.params.id);
      res.json({ message: "Role deleted" });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new GradeHandler();
