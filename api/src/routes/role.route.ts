import { Router } from "express";
import roleController from "../controllers/role.controller";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeNonDemoRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createRoleSchema,
  roleIdParamSchema,
  updateRoleSchema,
} from "../validators/role.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  authorizeNonDemoRoles("admin"),
  validate(createRoleSchema),
  asyncHandler(roleController.create.bind(roleController)),
);
router.get("/", asyncHandler(roleController.getAll.bind(roleController)));
router.get(
  "/:id",
  validate(roleIdParamSchema),
  asyncHandler(roleController.getOne.bind(roleController)),
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeNonDemoRoles("admin"),
  validate(updateRoleSchema),
  asyncHandler(roleController.update.bind(roleController)),
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeNonDemoRoles("admin"),
  validate(roleIdParamSchema),
  asyncHandler(roleController.delete.bind(roleController)),
);

export default router;
