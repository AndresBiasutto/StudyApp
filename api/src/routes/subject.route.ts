import { Router } from "express";
import subjectController from "../controllers/subject.controller";

const router = Router();

router.post("/", subjectController.create);
router.get("/", subjectController.getAll);
router.get("/:id", subjectController.getOne);
router.put("/:id", subjectController.update);
router.delete("/:id", subjectController.delete);

export default router;
