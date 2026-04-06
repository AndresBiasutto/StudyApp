import { Router } from "express";

import examResultController from "../controllers/exam-result.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  chapterExamParamSchema,
  submitExamResultSchema,
} from "../validators/exam.validator";

const router = Router();

router.get(
  "/chapter/:id_chapter/me",
  authenticateJWT,
  authorizeRoles("student"),
  validate(chapterExamParamSchema),
  asyncHandler(examResultController.getMine.bind(examResultController)),
);

router.post(
  "/chapter/:id_chapter",
  authenticateJWT,
  authorizeRoles("student"),
  validate(submitExamResultSchema),
  asyncHandler(examResultController.submit.bind(examResultController)),
);

export default router;
