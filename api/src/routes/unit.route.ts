import { Router } from "express";
import unitController from "../controllers/unit.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authenticateJWT, authorizeRoles("teacher"), unitController.create);
router.get("/", unitController.getAll);
router.get("/:id", unitController.getOne);
router.put("/:id", authenticateJWT, authorizeRoles("teacher"), unitController.update);
router.delete("/:id", authenticateJWT, authorizeRoles("teacher"), unitController.delete);

export default router;
