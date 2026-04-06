import { Request, Response } from "express";

import examService from "../services/exam.service";

class ExamController {
  async getChapterExam(req: Request, res: Response) {
    const questions = await examService.getChapterExam(req.params.id_chapter);
    res.status(200).json(questions);
  }
}

export default new ExamController();
