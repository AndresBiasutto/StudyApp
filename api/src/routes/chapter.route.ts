import { Router } from "express";
import chapterHandler from "../handlers/chapter.handler";

const router = Router();

router.post("/", chapterHandler.create);
router.get("/", chapterHandler.getAll);
router.get("/:id", chapterHandler.getOne);
router.put("/:id", chapterHandler.update);
router.delete("/:id", chapterHandler.delete);

export default router;
