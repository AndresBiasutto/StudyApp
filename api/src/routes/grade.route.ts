import { Router } from "express";
import gradeController from "../controllers/grade.controller";

const router = Router();

router.post("/", gradeController.create);
router.get("/", gradeController.getAll);
router.get("/:id", gradeController.getOne);
router.put("/:id", gradeController.update);
router.delete("/:id", gradeController.delete);

export default router;
