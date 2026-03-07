import { Router } from "express";
import gradeHandler from "../handlers/grade.handler";

const router = Router();

router.post("/", gradeHandler.create);
router.get("/", gradeHandler.getAll);
router.get("/:id", gradeHandler.getOne);
router.put("/:id", gradeHandler.update);
router.delete("/:id", gradeHandler.delete);

export default router;