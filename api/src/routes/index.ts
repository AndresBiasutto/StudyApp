import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";
import userRoutes from "./user.route";
import subjectRoutes from "./subject.route";
import UnitRoutes from "./unit.route";
import ChapterRoutes from "./chapter.route";
import MediaRoutes from "./media.route";
import roleRoutes from "./role.route";

const router = Router();

router.get("/health", healthCheck);
router.use("/users", userRoutes);
router.use("/subjects", subjectRoutes);
router.use("/units", UnitRoutes);
router.use("/chapters", ChapterRoutes);
router.use("/media", MediaRoutes);
router.use("/roles", roleRoutes);

export default router;