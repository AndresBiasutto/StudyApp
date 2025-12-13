import { Router } from "express";
import userHandler from "../handlers/user.handler";

const router = Router();

router.post("/", userHandler.createUser);
router.post("/register", userHandler.registerUser);
router.post("/login", userHandler.loginUser);
router.get("/verify", userHandler.verifyToken)
router.get("/", userHandler.getAllUsers);
router.get("/:id_user", userHandler.getUser);
router.get("/name/:name", userHandler.getUserByName);
router.put("/:id_user", userHandler.updateUser);
router.delete("/:id_user", userHandler.deleteUser);

export default router;