import { Response } from "express";

import examResultService from "../services/exam-result.service";
import type { AuthRequest } from "../middlewares/auth.middleware";

class ExamResultController {
  async submit(req: AuthRequest, res: Response) {
    const examResult = await examResultService.submitChapterExam(
      req.user?.id_user ?? "",
      req.params.id_chapter,
      req.body.answers,
    );

    res.status(200).json(examResult);
  }

  async getMine(req: AuthRequest, res: Response) {
    const examResult = await examResultService.getMyChapterExamResult(
      req.user?.id_user ?? "",
      req.params.id_chapter,
    );

    res.status(200).json(examResult);
  }
}

export default new ExamResultController();
