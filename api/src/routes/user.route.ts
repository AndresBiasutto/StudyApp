import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin"), userController.createUser);
router.post("/authUser", userController.authUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", authenticateJWT, userController.getMe);
router.get("/verify", userController.verifyToken);
router.get("/allteachers",
    //  authenticateJWT, authorizeRoles("admin"),
     userController.getAllTeachers);
router.get("/allStudents", 
    // authenticateJWT, authorizeRoles("admin"), 
userController.getAllStudents);
router.get("/liData", authenticateJWT, authorizeRoles("admin"), userController.getAllLiDataUsers);
router.get("/liData/:id_user", authenticateJWT, authorizeRoles("admin"), userController.getSelectedUser);
router.get("/", authenticateJWT, authorizeRoles("admin"), userController.getAllUsers);
// router.get("/:id_user", userController.getUserById);
// router.get("/name/:name", userController.getUserByName);
router.put("/updateRole/:id_user", authenticateJWT, authorizeRoles("admin"), userController.updateUserRole);
// router.put("/:id_user", userController.updateUser);
router.delete("/:id_user", authenticateJWT, authorizeRoles("admin"), userController.deleteUser);

export default router;
