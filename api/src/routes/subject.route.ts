import { Router } from "express";
import subjectController from "../controllers/subject.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("admin"), subjectController.create);
router.get("/", subjectController.getAll);
router.get("/:id", subjectController.getOne);
router.put("/:id", authenticateJWT, authorizeRoles("admin"), subjectController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), subjectController.delete);

export default router;
