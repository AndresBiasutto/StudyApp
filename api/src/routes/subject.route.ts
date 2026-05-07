import { Router } from "express";
import subjectController from "../controllers/subject.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import {
  authorizeRoles,
  forbidDemoUserMutation,
} from "../middlewares/role.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createSubjectSchema,
  subjectIdParamSchema,
  updateSubjectSchema,
} from "../validators/subject.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  validate(createSubjectSchema),
  asyncHandler(subjectController.create.bind(subjectController)),
);
router.get("/", asyncHandler(subjectController.getAll.bind(subjectController)));
router.get(
  "/:id",
  validate(subjectIdParamSchema),
  asyncHandler(subjectController.getOne.bind(subjectController)),
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  forbidDemoUserMutation,
  validate(updateSubjectSchema),
  asyncHandler(subjectController.update.bind(subjectController)),
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  forbidDemoUserMutation,
  validate(subjectIdParamSchema),
  asyncHandler(subjectController.delete.bind(subjectController)),
);

export default router;
