import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  authUserSchema,
  createUserSchema,
  loginUserSchema,
  registerUserSchema,
  updateMeSchema,
  updateUserRoleSchema,
  userIdParamSchema,
  verifyTokenSchema,
} from "../validators/user.validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  validate(createUserSchema),
  asyncHandler(userController.createUser.bind(userController)),
);
router.post(
  "/authUser",
  validate(authUserSchema),
  asyncHandler(userController.authUser.bind(userController)),
);
router.post(
  "/register",
  validate(registerUserSchema),
  asyncHandler(userController.registerUser.bind(userController)),
);
router.post(
  "/login",
  validate(loginUserSchema),
  asyncHandler(userController.loginUser.bind(userController)),
);
router.get("/me", authenticateJWT, asyncHandler(userController.getMe.bind(userController)));
router.put(
  "/me",
  authenticateJWT,
  validate(updateMeSchema),
  asyncHandler(userController.updateMe.bind(userController)),
);
router.get(
  "/verify",
  validate(verifyTokenSchema),
  asyncHandler(userController.verifyToken.bind(userController)),
);
router.get(
  "/allteachers",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(userController.getAllTeachers.bind(userController)),
);
router.get(
  "/allStudents",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(userController.getAllStudents.bind(userController)),
);
router.get(
  "/liData",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(userController.getAllLiDataUsers.bind(userController)),
);
router.get(
  "/liData/:id_user",
  authenticateJWT,
  authorizeRoles("admin"),
  validate(userIdParamSchema),
  asyncHandler(userController.getSelectedUser.bind(userController)),
);
router.get(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  asyncHandler(userController.getAllUsers.bind(userController)),
);
// router.get("/:id_user", userController.getUserById);
// router.get("/name/:name", userController.getUserByName);
router.put(
  "/updateRole/:id_user",
  authenticateJWT,
  authorizeRoles("admin"),
  validate(updateUserRoleSchema),
  asyncHandler(userController.updateUserRole.bind(userController)),
);
// router.put("/:id_user", userController.updateUser);
router.delete(
  "/:id_user",
  authenticateJWT,
  authorizeRoles("admin"),
  validate(userIdParamSchema),
  asyncHandler(userController.deleteUser.bind(userController)),
);

export default router;
