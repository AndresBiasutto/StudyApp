import { Request, Response } from "express";

import aiService from "../services/ai.service";

class AiController {
  async getQuiz(req: Request, res: Response) {
    const force = req.query.force === "true";
    const quiz = await aiService.generateQuiz(req.params.id_chapter, force);

    res.status(200).json(quiz);
  }
}

export default new AiController();
