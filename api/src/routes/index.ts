import { Router } from "express";
import { healthCheck } from "../config/health.controller";
import userRoutes from "./user.route";
import subjectRoutes from "./subject.route";
import UnitRoutes from "./unit.route";
import ChapterRoutes from "./chapter.route";
import MediaRoutes from "./media.route";
import roleRoutes from "./role.route";
import gradeRoutes from "./grade.route";
import { aiRouter } from "./ai";

const router = Router();
router.use("/users", userRoutes);
router.use("/ai", aiRouter)
// router.get("/health", healthCheck);
router.use("/subjects", subjectRoutes);
router.use("/units", UnitRoutes);
router.use("/chapters", ChapterRoutes);
router.use("/media", MediaRoutes);
router.use("/roles", roleRoutes);
router.use("/grades", gradeRoutes);

export default router;