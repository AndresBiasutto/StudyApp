import { Router } from "express";

import aiController from "../controllers/ai.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import { chapterExamParamSchema } from "../validators/ai.validator";

export const aiRouter = Router();

aiRouter.get(
  "/multiple-choice/:id_chapter",
  validate(chapterExamParamSchema),
  asyncHandler(aiController.getQuiz.bind(aiController)),
);
