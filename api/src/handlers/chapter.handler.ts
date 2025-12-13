import { Request, Response } from "express";
import chapterController from "../controllers/chapter.controller";

class ChapterHandler {
  async create(req: Request, res: Response) {
    try {
      const chapter = await chapterController.create(req.body);
      res.status(201).json(chapter);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const chapter = await chapterController.getOne(req.params.id);
      res.json(chapter);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const chapters = await chapterController.getAll();
      res.json(chapters);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const chapter = await chapterController.getByName(req.params.name);
      if (!chapter) return res.status(404).json({ error: "Chapter not found" });
      res.json(chapter);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await chapterController.update(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      chapterController.delete(req.params.id);
      res.json({ message: "Chapter deleted" });
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ChapterHandler();
