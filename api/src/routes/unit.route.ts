import { Router } from "express";
import unitHandler from "../handlers/unit.handler";

const router = Router();

router.post("/", unitHandler.create);
router.get("/", unitHandler.getAll);
router.get("/:id", unitHandler.getOne);
router.put("/:id", unitHandler.update);
router.delete("/:id", unitHandler.delete);

export default router;
