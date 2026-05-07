import { Router } from "express";
import unitController from "../controllers/unit.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import {
  authorizeRoles,
  authorizeTeacherOrDemoAdmin,
  forbidDemoUserMutation,
} from "../middlewares/role.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  ensureTeacherOwnsSubjectFromBody,
  ensureTeacherOwnsUnitByParam,
} from "../middlewares/ownership.middleware";
import {
  createUnitSchema,
  unitIdParamSchema,
  updateUnitSchema,
} from "../validators/unit.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  authorizeTeacherOrDemoAdmin,
  validate(createUnitSchema),
  ensureTeacherOwnsSubjectFromBody(),
  asyncHandler(unitController.create.bind(unitController)),
);
router.get("/", asyncHandler(unitController.getAll.bind(unitController)));
router.get(
  "/:id",
  validate(unitIdParamSchema),
  asyncHandler(unitController.getOne.bind(unitController)),
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("teacher"),
  forbidDemoUserMutation,
  validate(updateUnitSchema),
  ensureTeacherOwnsUnitByParam(),
  asyncHandler(unitController.update.bind(unitController)),
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("teacher"),
  forbidDemoUserMutation,
  validate(unitIdParamSchema),
  ensureTeacherOwnsUnitByParam(),
  asyncHandler(unitController.delete.bind(unitController)),
);

export default router;
