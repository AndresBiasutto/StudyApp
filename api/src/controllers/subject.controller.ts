import { Request, Response } from "express";
import  subjectService from "../services/subject.service";

class SubjectController {
  async create(req: Request, res: Response) {
    try {
      const subject = await subjectService.createSubject(req.body);
      res.status(201).json(subject);
    } catch (error) {
      res.status(500).json({ error: "Error creating subject" });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const subject = await subjectService.getSubject(req.params.id);
      if (!subject) return res.status(404).json({ message: "Subject not found" });
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: "Error fetching subject" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const subjects = await subjectService.getAllSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: "Error fetching subjects" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await subjectService.updateSubject(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Subject not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Error updating subject" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await subjectService.deleteSubject(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Subject not found" });
      res.json({ message: "Subject deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting subject" });
    }
  }
}
export default new SubjectController();