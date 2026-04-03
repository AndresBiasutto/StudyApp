import { Router } from "express";

import aiController from "../controllers/ai.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";

export const aiRouter = Router();

aiRouter.get("/", asyncHandler(aiController.getQuiz.bind(aiController)));
