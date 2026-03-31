import { Request, Response } from "express";
import chapterService from "../services/chapter.service";

class ChapterController {
  async create(req: Request, res: Response) {
    const chapter = await chapterService.create(req.body);
    res.status(201).json(chapter);
  }

  async getOne(req: Request, res: Response) {
    const chapter = await chapterService.getOne(req.params.id);
    res.json(chapter);
  }

  async getAll(_req: Request, res: Response) {
    const chapters = await chapterService.getAll();
    res.json(chapters);
  }

  async getByName(req: Request, res: Response) {
    const chapter = await chapterService.getByName(req.params.name);
    res.json(chapter);
  }

  async update(req: Request, res: Response) {
    const updated = await chapterService.update(req.params.id, req.body);
    res.json(updated);
  }

  async saveDraft(req: Request, res: Response) {
    const chapter = await chapterService.saveDraft(req.params.id, req.body);
    res.json(chapter);
  }

  async publish(req: Request, res: Response) {
    const chapter = await chapterService.publish(req.params.id, req.body);
    res.json(chapter);
  }

  async delete(req: Request, res: Response) {
    await chapterService.delete(req.params.id);
    res.json({ message: "Chapter deleted" });
  }
}

export default new ChapterController();
