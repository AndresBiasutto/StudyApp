import { Router } from "express";
import gradeController from "../controllers/grade.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createGradeSchema,
  gradeIdParamSchema,
  updateGradeSchema,
} from "../validators/grade.validator";

const router = Router();

router.post(
  "/",
  validate(createGradeSchema),
  asyncHandler(gradeController.create.bind(gradeController)),
);
router.get("/", asyncHandler(gradeController.getAll.bind(gradeController)));
router.get(
  "/:id",
  validate(gradeIdParamSchema),
  asyncHandler(gradeController.getOne.bind(gradeController)),
);
router.put(
  "/:id",
  validate(updateGradeSchema),
  asyncHandler(gradeController.update.bind(gradeController)),
);
router.delete(
  "/:id",
  validate(gradeIdParamSchema),
  asyncHandler(gradeController.delete.bind(gradeController)),
);

export default router;
