import { Router } from "express";
import roleHandler from "../handlers/role.handler";

const router = Router();

router.post("/", roleHandler.create);
router.get("/", roleHandler.getAll);
router.get("/:id", roleHandler.getOne);
router.put("/:id", roleHandler.update);
router.delete("/:id", roleHandler.delete);

export default router;
