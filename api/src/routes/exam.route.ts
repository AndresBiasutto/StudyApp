import { Router } from "express";

import examController from "../controllers/exam.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import { chapterExamParamSchema } from "../validators/exam.validator";

const router = Router();

router.get(
  "/chapter/:id_chapter",
  authenticateJWT,
  authorizeRoles("student"),
  validate(chapterExamParamSchema),
  asyncHandler(examController.getChapterExam.bind(examController)),
);

export default router;
