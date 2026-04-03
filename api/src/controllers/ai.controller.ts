import { Request, Response } from "express";

import aiService from "../services/ai.service";

class AiController {
  async getQuiz(req: Request, res: Response) {
    const quiz = await aiService.generateQuiz(req.params.id_chapter);

    res.status(200).json(quiz);
  }
}

export default new AiController();
