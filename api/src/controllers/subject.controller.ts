import { Request, Response } from "express";
import subjectService from "../services/subject.service";
import { NotFoundError } from "../utils/errors";

class SubjectController {
  async create(req: Request, res: Response) {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json(subject);
  }

  async getOne(req: Request, res: Response) {
    const subject = await subjectService.getSubject(req.params.id);
    if (!subject) {
      throw new NotFoundError("Subject not found");
    }

    res.json(subject);
  }

  async getAll(_req: Request, res: Response) {
    const subjects = await subjectService.getAllSubjects();
    res.json(subjects);
  }

  async update(req: Request, res: Response) {
    const updated = await subjectService.updateSubject(req.params.id, req.body);
    if (!updated) {
      throw new NotFoundError("Subject not found");
    }

    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const deleted = await subjectService.deleteSubject(req.params.id);
    if (!deleted) {
      throw new NotFoundError("Subject not found");
    }

    res.json({ message: "Subject deleted" });
  }
}

export default new SubjectController();
