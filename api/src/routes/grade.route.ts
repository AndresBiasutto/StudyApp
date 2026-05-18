import { Router } from "express";
import gradeController from "../controllers/grade.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeNonDemoRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createGradeSchema,
  gradeIdParamSchema,
  updateGradeSchema,
} from "../validators/grade.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  authorizeNonDemoRoles("admin"),
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
  authenticateJWT,
  authorizeNonDemoRoles("admin"),
  validate(updateGradeSchema),
  asyncHandler(gradeController.update.bind(gradeController)),
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeNonDemoRoles("admin"),
  validate(gradeIdParamSchema),
  asyncHandler(gradeController.delete.bind(gradeController)),
);

export default router;
