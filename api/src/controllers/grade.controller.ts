import { Request, Response } from "express";

import gradeService from "../services/grade.service";

class GradeController {
  async create(req: Request, res: Response) {
    const grade = await gradeService.createGrade(req.body);
    res.status(201).json(grade);
  }

  async getOne(req: Request, res: Response) {
    const grade = await gradeService.getGrade(req.params.id);
    res.json(grade);
  }

  async getAll(_req: Request, res: Response) {
    const grades = await gradeService.getAllGrades();
    res.json(grades);
  }

  async update(req: Request, res: Response) {
    const updated = await gradeService.updateGrade(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await gradeService.deleteGrade(req.params.id);
    res.json({ message: "Grade deleted" });
  }
}

export default new GradeController();
