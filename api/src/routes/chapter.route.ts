import { Router } from "express";
import chapterController from "../controllers/chapter.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("teacher"), chapterController.create);
router.get("/", chapterController.getAll);
router.get("/:id", chapterController.getOne);
router.put("/:id", authenticateJWT, authorizeRoles("teacher"), chapterController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("teacher"), chapterController.delete);

export default router;
